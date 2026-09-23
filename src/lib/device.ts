/** 浏览器端设备探测：首页下载按钮按系统与 CPU 架构选择安装包。 */

export type CpuArch = 'x86' | 'arm64';

export type DeviceOs = 'windows' | 'macos' | 'harmonyos' | 'unknown';

export interface DetectedDevice {
  os: DeviceOs;
  /** 只有在浏览器能明确报告 CPU 架构时才有值 */
  arch?: CpuArch;
}

interface UserAgentData {
  getHighEntropyValues(hints: string[]): Promise<{ architecture?: string; bitness?: string }>;
}

const readArchFromUserAgentData = async (): Promise<CpuArch | undefined> => {
  const userAgentData = (navigator as Navigator & { userAgentData?: UserAgentData }).userAgentData;
  if (!userAgentData?.getHighEntropyValues) return undefined;

  try {
    const { architecture } = await userAgentData.getHighEntropyValues(['architecture', 'bitness']);
    if (architecture === 'arm') return 'arm64';
    if (architecture === 'x86') return 'x86';
  } catch {
    // 浏览器拒绝提供高熵信息时回退到 UA 判断
  }

  return undefined;
};

export const detectDevice = async (): Promise<DetectedDevice> => {
  const ua = navigator.userAgent;
  const platform = navigator.platform ?? '';

  // HarmonyOS 设备的浏览器可能暴露类似 Windows 的 UA，需要优先判断
  if (/harmony\s?os|ohos|openharmony/i.test(`${ua} ${platform}`)) return { os: 'harmonyos' };

  // macOS 的 UA 里始终写着 Intel，因此只信任 userAgentData 报告的架构
  const arch = (await readArchFromUserAgentData()) ?? (/arm64|aarch64/i.test(ua) ? 'arm64' : undefined);

  if (/windows|win32|win64/i.test(platform) || /windows/i.test(ua)) return { os: 'windows', arch };
  if (/macintosh|macintel|macppc|mac68k|darwin/i.test(platform) || /mac os x/i.test(ua)) {
    return { os: 'macos', arch };
  }

  return { os: 'unknown', arch };
};

/** 架构无法确定时的兜底选择：Windows 走 x86（ARM64 可兼容运行），macOS 走 Apple 芯片 */
export const fallbackArch = (os: DeviceOs): CpuArch | undefined => {
  if (os === 'windows') return 'x86';
  if (os === 'macos') return 'arm64';
  return undefined;
};

/** 从同一平台的多个安装包中选出匹配架构的一个，未标注架构的包视为通用包 */
export const selectAsset = <T extends { arch?: CpuArch }>(assets: T[], arch?: CpuArch): T | undefined => {
  if (assets.length === 0) return undefined;
  if (arch) {
    return assets.find((asset) => asset.arch === arch) ?? assets.find((asset) => !asset.arch) ?? assets[0];
  }

  return assets.find((asset) => !asset.arch) ?? assets[0];
};
