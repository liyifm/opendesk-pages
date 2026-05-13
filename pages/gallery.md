---
layout: single
title: 使用场景
permalink: /gallery
toc: false
classes: wide no-sidebar
---

> 作者的宗旨是：让 Agent 帮我们工作，解放我的双手享受生活；而不是让智能体加速社会节奏，让我们更加浮躁 :(

OpenDesk 设计上是一个你可以随意使用各种模型，MCP，Skills……来实现你的目标的通用智能体。你可以兴致所至，任意发挥，让 OpenDesk 帮你完成各种工作。但为了让大家能够更快更好的用起 OpenDesk，这里也列举了一些我们自己认为比较常用的场景，也欢迎你向我们反馈其他有价值的场景供参考~

## 文件管理和远程控制

<div class="gallery-grid">
  <a href="/gallery/file_organize" class="gallery-item">
    <img src="/assets/images/gallery/file_organize_small.png" alt="整理文件">
    <h3>文件整理</h3>
    <p>把混乱的目录重新归档，清理过时或重复的内容，自动把文件改成合适的名字……所有你嫌麻烦的事情，都可以试一下让 OpenDesk 来搞定。</p>
  </a>
  <a href="/gallery/file_transfer" class="gallery-item">
    <img src="/assets/images/gallery/file_transfer_small.png" alt="远程文件查找">
    <h3>远程文件查找</h3>
    <p>出差路上，突然急需电脑上的重要文件？你可以通过飞书机器人等多种方式随时联系 OpenDesk，无论身在何处都能快速找到你需要的内容。</p>
  </a>
  <a href="/gallery/file_batch" class="gallery-item">
    <img src="/assets/images/gallery/file_batch_small.png" alt="批量文件处理">
    <h3>批量文件处理</h3>
    <p>有很多视频需要压缩，图片需要裁剪，格式需要调整？把你的需求告诉 OpenDesk，它会自动选择合适的技能和工具，喝个咖啡的功夫，繁琐的工作就能完成。</p>
  </a>
</div>

## 开发运维和定时任务

## 信息收集和持续监控

<style>
/* 强制全宽布局 */
.page__content {
    max-width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.page {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

.page__inner {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

/* 隐藏侧边栏 */
.sidebar {
    display: none !important;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0 2rem 0;
}

.gallery-item {
    display: block;
    text-decoration: none !important;
    color: inherit;
    border: 1px solid var(--border-color, #e1e4e8);
    border-radius: 8px;
    overflow: hidden;
    background: var(--background-color, #fff);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.gallery-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    text-decoration: none !important;
}

.gallery-item img {
    width: 100%;
    height: auto;
    display: block;
}

.gallery-item h3 {
    margin: 1rem 1rem 0.5rem 1rem;
    font-size: 1.1em;
    color: inherit;
    text-decoration: none !important;
}

.gallery-item p {
    margin: 0.5rem 1rem 1rem 1rem;
    color: var(--text-muted, #666);
    font-size: 0.95em;
    line-height: 1.5;
    text-decoration: none !important;
}
</style>