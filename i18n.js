/* ============================================================
   全站中英双语：字典 + 切换逻辑
   - 页面默认写中文，关闭 JS 时内容完整可见
   - 语言存 localStorage，首页 / 详情页之间跳转会保持
   - 含 HTML 的条目在元素上加 data-i18n-html，其余按纯文本替换
   ============================================================ */
(function () {
  'use strict';

  var ZH = {
    /* ---------- 通用 ---------- */
    'common.skip': `跳到主要内容`,
    'common.brand': `RiemannChow 的作品`,
    'common.wordmark.aria': `返回首页`,
    'common.nav.aria': `主导航`,
    'common.nav.projects': `项目`,
    'common.nav.about': `关于`,
    'common.nav.github': `GitHub ↗`,
    'common.lang.aria': `语言切换`,
    'common.back': `全部项目`,
    'common.source': `GitHub 源码 ↗`,
    'common.cta.source': `在 GitHub 看源码`,
    'common.cta.sourceArrow': `去 GitHub 看源码 ↗`,
    'common.cta.run': `怎么跑起来 ↓`,
    'common.cta.back': `← 返回作品集`,
    'common.footer.repo': `GitHub 仓库`,
    'common.footer.all': `全部项目`,

    /* ---------- 首页 ---------- */
    'home.meta.title': `RiemannChow 的作品 · 自己写、认真打磨的开源系统`,
    'home.meta.desc': `两个从零搭起来的开源系统：agent-hub —— 会查数据、会画卡片的对话式 AI Agent；GroveMQ —— 面向 AI / IoT / 车联网的 Go MQTT Broker。代码、文档与设计取舍都在 GitHub 上。`,
    'home.title': `自己写、认真打磨的<br><em>开源系统</em>`,
    'home.sub': `不是 demo，是能跑起来的系统：一个会查数据、会把结果画成卡片的 Agent，一个替海量设备转消息的 Broker。代码、文档和设计取舍，都摊开在 GitHub 上。`,
    'home.icons.aria': `项目与技术栈`,
    'home.icon.ah': `打开 agent-hub 详情页`,
    'home.icon.mq': `打开 GroveMQ 详情页`,
    'home.cta.browse': `看看有哪些项目`,
    'home.fact1': `2 个开源项目`,
    'home.fact3': `持续更新中`,
    'home.all': `全部项目`,
    'home.ah.badge': `领衔`,
    'home.ah.desc': `一个会查数据的对话式 Agent：ReAct 编排工具调用，工具直接返回结构化卡片而不是一坨文字；向量 + 全文 + 标量混合检索，还有跨会话也认得你的长期记忆。`,
    'home.ah.sub': `DDD 分层 · SSE 流式事件 · A2UI 结果卡片 · A2A 协议与 Nacos 发现`,
    'home.ah.tag4': `混合检索 / RRF`,
    'home.ah.alt': `agent-hub 项目图标`,
    'home.mq.badge': `新登场`,
    'home.mq.desc': `给 AI、IoT 和车联网写的 MQTT Broker：轻量 Actor 内核管会话，节点间用 gRPC 自动路由消息，在 K8s 里靠 headless service 自己找到同伴。`,
    'home.mq.sub': `持久会话 · 共享订阅 · TLS / ACL · Prometheus 指标 · 三节点集群实测`,
    'home.mq.tag3': `Actor 模型`,
    'home.mq.tag4': `gRPC 集群`,
    'home.mq.alt': `GroveMQ 项目图标`,
    'home.placeholder': `第三个位置，还空着。<br>更多项目正在路上，先去 GitHub 逛逛也可以 <a href="https://github.com/RiemannChow?tab=repositories" target="_blank" rel="noopener noreferrer">↗</a>`,
    'home.about.kicker': `关于我`,
    'home.about.title': `把复杂的东西拆清楚，再一行行搭回来。`,
    'home.about.bio': `RiemannChow，「老周聊架构」主理人，专注AI、大数据、云原生、数据库、物联网10余年，InfoQ签约作者，阿里云博客专家，腾讯云架构师深圳同盟理事，IT新媒体年度优秀文章，特别擅长分布式消息引擎Kafka以及Pulsar，seekdb贡献者。`,
    'home.about.avatarAlt': `RiemannChow 的 GitHub 头像`,
    'home.about.githubBtn': `GitHub 主页 ↗`,
    'home.about.reposBtn': `全部仓库 ↗`,
    'home.qr.kicker': `关注我`,
    'home.qr.title': `老周聊架构`,
    'home.qr.sub': `微信扫一扫，加我聊聊架构`,
    'home.qr.hint': `点击查看大图 ↗`,
    'home.qr.alt': `老周聊架构 微信二维码`,
    'home.footer.projects': `回到项目`,

    /* ---------- agent-hub 详情页 ---------- */
    'ah.meta.title': `agent-hub · 查完数据，直接给你卡片 | RiemannChow 的作品`,
    'ah.meta.desc': `agent-hub：基于 AgentScope Java 2.0 与 Spring Boot WebFlux 的对话式数据分析 Agent。ReAct 编排、A2UI 结构化结果卡片、混合检索 RRF、双层记忆与 DDD 分层。`,
    'ah.cross': `GroveMQ →`,
    'ah.appName': `agent-hub · 对话式数据分析 Agent`,
    'ah.appCat': `Java 21 · AI Agent · 开源`,
    'ah.hero.title': `Agent 查完数据，<br><em>直接给你卡片。</em>`,
    'ah.hero.sub': `一个基于 AgentScope Java 2.0 与 Spring Boot WebFlux 的对话式数据分析 Agent。工具不再吐一坨 markdown，而是返回带 type 的结构化 JSON，浏览器直接挂载成图表卡片；向量、全文、标量三路检索用 RRF 融合排序，会话之外还有能被语义召回的长期记忆。`,
    'ah.iconAlt': `agent-hub 项目图标`,
    'ah.demo.user': `帮我找 2020 年后评分最高的几本书`,
    'ah.demo.vector': `向量`,
    'ah.demo.fulltext': `全文`,
    'ah.demo.scalar': `标量`,
    'ah.demo.hybridLabel': `三路召回 · RRF 融合`,
    'ah.demo.hit2': `《数据密集型应用系统设计》`,
    'ah.demo.hit3Count': `12 条`,
    'ah.demo.chartLabel': `按年份统计`,
    'ah.demo.note': `界面示意 · 数据仅用于展示卡片结构`,
    'ah.demo.float': `工具返回 JSON，前端直接挂卡片`,
    'ah.why.kicker': `为什么`,
    'ah.why.title': `问一句数据问题，<br>它回你一堵文字墙。`,
    'ah.why.sub': `工具输出是 markdown，模型再复述一遍，结构没了，数字也容易走样。`,
    'ah.why.1h': `结果被复述一遍`,
    'ah.why.1p': `LLM 把工具返回的表格重新写成人话，既多花一轮 token，数字还可能走样，用户也没法直接拿去用。`,
    'ah.why.2h': `检索只有一条路`,
    'ah.why.2p': `纯向量召回会漏掉精确条件——「2020 年后、评分 4.5 以上」这类标量过滤，没地方放。`,
    'ah.why.3h': `聊完就忘`,
    'ah.why.3p': `会话一关，上次说过的口径和事实全丢，下次又得从头交代一遍。`,
    'ah.why.transition': `所以 agent-hub 把「工具返回什么」和「界面怎么显示」<em>拆成了两件事</em>。`,
    'ah.feat.kicker': `做了什么`,
    'ah.feat.title': `从编排到记忆，都自己搭了`,
    'ah.feat.sub': `每一块都能在仓库里找到对应的包和设计文档。`,
    'ah.feat.1h': `ReAct 编排`,
    'ah.feat.1p': `AgentScope 2.0 的 ReActAgent 驱动，31 类事件被折叠成 5 种领域事件，通过 SSE 推到浏览器。`,
    'ah.feat.2h': `A2UI 结构化卡片`,
    'ah.feat.2p': `工具返回 <code>type: chart | hybrid | table</code> 的 JSON 信封，前端检测后挂载原生卡片，并明确禁止模型复述结果。`,
    'ah.feat.3h': `混合检索 + RRF`,
    'ah.feat.3p': `本地哈希向量、全文匹配、标量过滤三路召回，用 Reciprocal Rank Fusion 融合排序，不依赖外部向量服务。`,
    'ah.feat.4h': `双层记忆`,
    'ah.feat.4p': `会话内历史之外，异步 MemoryExtractor 蒸馏稳定事实，跨会话按语义召回。`,
    'ah.feat.5h': `DDD 分层`,
    'ah.feat.5p': `presentation → application → domain ← infrastructure，依赖只向内，外部系统只由基础设施适配器接触。`,
    'ah.feat.6h': `可换人格 / A2A`,
    'ah.feat.6p': `换一个 AgentPersona 就换行业；A2A 协议配合 Nacos 发现，出站委派与取消都带签名。`,
    'ah.run.kicker': `跑起来`,
    'ah.run.title': `三步，本地就能对话`,
    'ah.run.sub': `需要 JDK 21、Maven 3.9+ 和 Docker Compose。`,
    'ah.run.1h': `起基础设施`,
    'ah.run.1p': `SeekDB :2881、MongoDB :27017、Neo4j :7687 一次拉起，初始化 SQL 由容器挂载执行。`,
    'ah.run.2h': `配置密钥并构建`,
    'ah.run.2p': `模型密钥只走环境变量，仓库里只有 .env.example 的字段名。`,
    'ah.run.3h': `启动并打开`,
    'ah.run.3p': `先通过手机号验证码或微信扫码登录，再进入聊天页。`,
    'ah.faq.kicker': `设计取舍`,
    'ah.faq.title': `几个被问过的问题`,
    'ah.faq.1h': `为什么不用图表库？`,
    'ah.faq.1p': `柱状图就是 div 的高度，饼图是 CSS 的 conic-gradient。前端零依赖、完全自包含，也不用为了画一张图引入一整个库。`,
    'ah.faq.2h': `为什么要三个 profile？`,
    'ah.faq.2p': `seekdb / mongo / oceanbase 共用同一套应用，换仓储实现和 AgentPersona，就能从电商数据分析切到 OceanBase 知识图谱问答。`,
    'ah.faq.3h': `模型密钥会进仓库吗？`,
    'ah.faq.3p': `不会。AGENT_MODEL_API_KEY 只从环境变量读取，仓库里只放 .env.example 说明有哪些变量可配。`,
    'ah.cta.h2': `代码、架构图和设计文档，都摊开在仓库里`,
    'ah.cta.p': `想看分层图、混合检索设计，或 A2UI 的信封格式，README 与 doc/ 目录里都有。`,

    /* ---------- GroveMQ 详情页 ---------- */
    'mq.meta.title': `GroveMQ · 海量设备接进来，消息照样送得到 | RiemannChow 的作品`,
    'mq.meta.desc': `GroveMQ：用 Go 写的 MQTT Broker，面向 AI / IoT / IIoT / 车联网。Actor 并发内核、gRPC 跨节点路由、Kubernetes 原生发现、Prometheus 指标与 TLS / ACL。`,
    'mq.cross': `agent-hub →`,
    'mq.appName': `GroveMQ · MQTT Broker`,
    'mq.appCat': `Go · 消息中间件 · 开源`,
    'mq.fact3': `gRPC 集群`,
    'mq.hero.title': `海量设备接进来，<br><em>消息照样送得到。</em>`,
    'mq.hero.sub': `一个用 Go 写的 MQTT Broker，面向 AI、IoT、IIoT 和车联网场景。轻量级的 Actor 内核管理每个客户端会话，节点之间用 gRPC 自动路由消息，在 Kubernetes 里靠 headless service 自己找到同伴；TLS / ACL、持久会话、共享订阅和 Prometheus 指标都在里面。`,
    'mq.iconAlt': `GroveMQ 项目图标`,
    'mq.demo.arrow': `gRPC 路由 · 跨节点 ↓`,
    'mq.demo.note': `界面示意 · 端口与测试流程来自 README`,
    'mq.demo.float': `订阅者不在同一节点，消息照样送得到`,
    'mq.why.kicker': `为什么`,
    'mq.why.title': `设备一多，<br>单节点 Broker 先撑不住。`,
    'mq.why.sub': `会话、订阅和消息路由挤在一个进程里，扩容只能靠堆机器，跨节点投递还得自己补。`,
    'mq.why.1h': `会话绑死在单机`,
    'mq.why.1p': `客户端一重连，订阅状态就断档；离线期间的消息也没地方落。`,
    'mq.why.2h': `集群要手工配`,
    'mq.why.2p': `节点列表写死在配置里，K8s 里 Pod 一漂移就对不上，扩容得先改一遍配置。`,
    'mq.why.3h': `出问题看不见`,
    'mq.why.3p': `没有指标，连接数、Actor 重启次数基本靠猜，排查只能翻日志。`,
    'mq.why.transition': `GroveMQ 用 Actor 管会话，把集群路由与节点发现<em>交给独立的模块</em>。`,
    'mq.feat.kicker': `做了什么`,
    'mq.feat.title': `从协议解析到集群发现，都在仓库里`,
    'mq.feat.sub': `pkg/ 下每个包管一件事，文档在 docs/ 里按角色分好了入口。`,
    'mq.feat.1h': `MQTT v3.1.1 / v5.0`,
    'mq.feat.1p': `CONNECT / SUBSCRIBE / PUBLISH 全流程，包含 MQTT 5.0 的 properties 与 reason codes。`,
    'mq.feat.2h': `Actor 并发内核`,
    'mq.feat.2p': `OTP 风格的轻量 Actor 管理每个会话，supervisor 按「let it crash」思路做容错重启。`,
    'mq.feat.3h': `动态集群`,
    'mq.feat.3p': `节点自动组成集群分担负载，跨节点消息路由由集群状态管理器自动处理。`,
    'mq.feat.4h': `K8s 原生发现`,
    'mq.feat.4p': `通过 headless service 自动发现 peer，Pod 漂移不用改节点列表。`,
    'mq.feat.5h': `gRPC 节点通信`,
    'mq.feat.5p': `Protobuf 强类型接口，承载路由、状态同步和集群管理三件事。`,
    'mq.feat.6h': `可观测与安全`,
    'mq.feat.6p': `Prometheus 指标（连接数、Actor 重启）、TLS、ACL、持久会话、retained 与共享订阅。`,
    'mq.run.kicker': `跑起来`,
    'mq.run.title': `三条命令，从单节点验到集群`,
    'mq.run.sub': `需要 Go 1.25+；三节点集群示例还需要 Docker Compose v2。`,
    'mq.run.1h': `构建`,
    'mq.run.1p': `产出仓库根目录下的 grovemq 二进制，记得从仓库根目录启动，才能读到 config.yaml。`,
    'mq.run.2h': `启动单节点`,
    'mq.run.2p': `1883 收 MQTT 连接、8081 走集群 gRPC、8082 暴露 /metrics。`,
    'mq.run.3h': `验跨节点投递`,
    'mq.run.3p': `订阅者连 node-2 (1884)、发布者连 node-1 (1883)，检查消息有没有送到对面。`,
    'mq.faq.kicker': `上线前`,
    'mq.faq.title': `有几件事得先改`,
    'mq.faq.1h': `默认账号能直接上生产吗？`,
    'mq.faq.1p': `不能。config.yaml 里的 admin / admin123 是演示凭据，README 明确要求：暴露到任何网络之前，替换所有密码、关闭不需要的账号、复核 TLS 与 ACL 设置。测试套件也用同一套凭据，改了要同步。`,
    'mq.faq.2h': `怎么确认跨节点投递真的通？`,
    'mq.faq.2p': `cluster-test 把订阅者接到 node-2 (1884)、发布者接到 node-1 (1883)，从 node-1 发一条消息，再看 node-2 的订阅者是否收到。Docker Compose 版直接用 docker-compose-cluster.yaml。`,
    'mq.faq.3h': `需要额外装数据库或注册中心吗？`,
    'mq.faq.3p': `不需要。会话存储是通用 KV 接口加内存实现，集群发现靠 K8s headless service，本地三节点用脚本或 compose 文件就能起。`,
    'mq.cta.h2': `从单节点到三节点集群，一条命令就能验`,
    'mq.cta.p': `协议实现、集群路由、K8s 清单、混沌工程与 E2E 测试报告，都收在 docs/ 里。`
  };

  var EN = {
    /* ---------- Common ---------- */
    'common.skip': `Skip to main content`,
    'common.brand': `RiemannChow's Work`,
    'common.wordmark.aria': `Back to home`,
    'common.nav.aria': `Main navigation`,
    'common.nav.projects': `Projects`,
    'common.nav.about': `About`,
    'common.nav.github': `GitHub ↗`,
    'common.lang.aria': `Language switcher`,
    'common.back': `All projects`,
    'common.source': `Source on GitHub ↗`,
    'common.cta.source': `View source on GitHub`,
    'common.cta.sourceArrow': `View the source on GitHub ↗`,
    'common.cta.run': `How to run it ↓`,
    'common.cta.back': `← Back to the portfolio`,
    'common.footer.repo': `GitHub repo`,
    'common.footer.all': `All projects`,

    /* ---------- Home ---------- */
    'home.meta.title': `RiemannChow's Work · Open-source systems, built from scratch`,
    'home.meta.desc': `Two systems built from scratch: agent-hub, a conversational AI agent that turns query results into cards, and GroveMQ, a Go MQTT broker for AI, IoT and connected vehicles. Code, docs and design notes are all on GitHub.`,
    'home.title': `Open-source systems,<br><em>built from scratch.</em>`,
    'home.sub': `Not demos — systems that actually run: an agent that queries data and renders the answer as cards, and a broker that moves messages for fleets of devices. Code, docs and design decisions are all out in the open on GitHub.`,
    'home.icons.aria': `Projects and tech stack`,
    'home.icon.ah': `Open the agent-hub page`,
    'home.icon.mq': `Open the GroveMQ page`,
    'home.cta.browse': `Browse the projects`,
    'home.fact1': `2 open-source projects`,
    'home.fact3': `Actively maintained`,
    'home.all': `ALL PROJECTS`,
    'home.ah.badge': `Featured`,
    'home.ah.desc': `A conversational agent for your data: ReAct orchestrates the tool calls, tools return structured cards instead of a wall of text, vector + full-text + scalar retrieval are fused together, and long-term memory still recognises you next session.`,
    'home.ah.sub': `DDD layers · SSE events · A2UI result cards · A2A protocol with Nacos discovery`,
    'home.ah.tag4': `Hybrid retrieval / RRF`,
    'home.ah.alt': `agent-hub project icon`,
    'home.mq.badge': `New`,
    'home.mq.desc': `An MQTT broker for AI, IoT and connected vehicles: a lightweight actor core owns each session, gRPC routes messages between nodes, and a headless service lets peers find each other in Kubernetes.`,
    'home.mq.sub': `Durable sessions · shared subscriptions · TLS / ACL · Prometheus metrics · 3-node cluster test`,
    'home.mq.tag3': `Actor model`,
    'home.mq.tag4': `gRPC cluster`,
    'home.mq.alt': `GroveMQ project icon`,
    'home.placeholder': `The third slot is still empty.<br>More projects are on the way — until then, feel free to browse GitHub <a href="https://github.com/RiemannChow?tab=repositories" target="_blank" rel="noopener noreferrer">↗</a>`,
    'home.about.kicker': `ABOUT`,
    'home.about.title': `Taking complex systems apart, then building them back line by line.`,
    'home.about.bio': `RiemannChow, creator of "Lao Zhou Talks Architecture". 10+ years across AI, big data, cloud-native, databases and IoT. Contracted InfoQ author, Alibaba Cloud blog expert, council member of the Tencent Cloud Architects Alliance (Shenzhen), and winner of an IT New Media Annual Outstanding Article award. Specialised in distributed messaging engines — Kafka and Pulsar — and a contributor to seekdb.`,
    'home.about.avatarAlt': `RiemannChow's GitHub avatar`,
    'home.about.githubBtn': `GitHub profile ↗`,
    'home.about.reposBtn': `All repositories ↗`,
    'home.qr.kicker': `FOLLOW`,
    'home.qr.title': `Lao Zhou Talks Architecture`,
    'home.qr.sub': `Scan with WeChat — let's talk architecture`,
    'home.qr.hint': `Open the full image ↗`,
    'home.qr.alt': `WeChat QR code for Lao Zhou Talks Architecture`,
    'home.footer.projects': `Back to projects`,

    /* ---------- agent-hub ---------- */
    'ah.meta.title': `agent-hub · Ask about your data, get a card back | RiemannChow's Work`,
    'ah.meta.desc': `agent-hub: a conversational data-analysis agent on AgentScope Java 2.0 and Spring Boot WebFlux. ReAct orchestration, A2UI structured result cards, RRF hybrid retrieval, dual memory and DDD layering.`,
    'ah.cross': `GroveMQ →`,
    'ah.appName': `agent-hub · Conversational data-analysis agent`,
    'ah.appCat': `Java 21 · AI agent · Open source`,
    'ah.hero.title': `Ask your data,<br><em>get a card back.</em>`,
    'ah.hero.sub': `A conversational data-analysis agent built on AgentScope Java 2.0 and Spring Boot WebFlux. Tools return typed JSON instead of a blob of markdown, and the browser mounts it as a native chart card. Vector, full-text and scalar recall are fused with RRF, and long-term memory survives across sessions.`,
    'ah.iconAlt': `agent-hub project icon`,
    'ah.demo.user': `Find the top-rated books published after 2020`,
    'ah.demo.vector': `Vector`,
    'ah.demo.fulltext': `Full-text`,
    'ah.demo.scalar': `Scalar`,
    'ah.demo.hybridLabel': `3-way recall · RRF fusion`,
    'ah.demo.hit2': `Data-Intensive Application Systems (CN ed.)`,
    'ah.demo.hit3Count': `12 hits`,
    'ah.demo.chartLabel': `Grouped by year`,
    'ah.demo.note': `UI illustration · sample data`,
    'ah.demo.float': `Tools return JSON → native cards`,
    'ah.why.kicker': `WHY`,
    'ah.why.title': `Ask one question about your data,<br>get back a wall of prose.`,
    'ah.why.sub': `Tool output is markdown, the model paraphrases it, structure disappears and numbers start to drift.`,
    'ah.why.1h': `Paraphrased results`,
    'ah.why.1p': `The LLM rewrites a table as prose — an extra round of tokens, a chance for numbers to drift, and nothing the user can actually reuse.`,
    'ah.why.2h': `Only one retrieval path`,
    'ah.why.2p': `Pure vector recall misses exact conditions. Filters like "after 2020, rating above 4.5" have nowhere to go.`,
    'ah.why.3h': `Forgets everything`,
    'ah.why.3p': `Close the session and the agreed definitions and facts are gone. Next time you start from scratch.`,
    'ah.why.transition': `So agent-hub <em>separates</em> "what a tool returns" from "how the UI renders it".`,
    'ah.feat.kicker': `WHAT'S INSIDE`,
    'ah.feat.title': `Orchestration to memory, all built in-house`,
    'ah.feat.sub': `Every piece maps to a package and a design doc in the repo.`,
    'ah.feat.1h': `ReAct orchestration`,
    'ah.feat.1p': `Driven by the AgentScope 2.0 ReActAgent: 31 typed events collapse into 5 domain events pushed to the browser over SSE.`,
    'ah.feat.2h': `A2UI structured cards`,
    'ah.feat.2p': `Tools return a <code>type: chart | hybrid | table</code> JSON envelope; the UI detects it and mounts a native card, and the prompt explicitly forbids restating the results.`,
    'ah.feat.3h': `Hybrid retrieval + RRF`,
    'ah.feat.3p': `Local hashing vectors, full-text matching and scalar filters are fused with Reciprocal Rank Fusion — no external vector service needed.`,
    'ah.feat.4h': `Dual memory`,
    'ah.feat.4p': `In-session history, plus an async MemoryExtractor that distils stable facts for semantic recall across sessions.`,
    'ah.feat.5h': `DDD layering`,
    'ah.feat.5p': `presentation → application → domain ← infrastructure. Dependencies point inward; only infrastructure adapters touch external systems.`,
    'ah.feat.6h': `Swappable persona / A2A`,
    'ah.feat.6p': `Swap one AgentPersona to change industry; the A2A protocol with Nacos discovery signs outbound delegation and cancellation.`,
    'ah.run.kicker': `GET IT RUNNING`,
    'ah.run.title': `Three steps to a local chat`,
    'ah.run.sub': `Requires JDK 21, Maven 3.9+ and Docker Compose.`,
    'ah.run.1h': `Start the infrastructure`,
    'ah.run.1p': `SeekDB :2881, MongoDB :27017 and Neo4j :7687 come up together; init SQL runs from a mounted volume.`,
    'ah.run.2h': `Set the key and build`,
    'ah.run.2p': `The model key lives only in environment variables; the repo ships just the field names in .env.example.`,
    'ah.run.3h': `Run and open`,
    'ah.run.3p': `Sign in with a phone OTP or WeChat QR first, then open the chat page.`,
    'ah.faq.kicker': `DESIGN NOTES`,
    'ah.faq.title': `Questions I get asked`,
    'ah.faq.1h': `Why not use a charting library?`,
    'ah.faq.1p': `Bar charts are just div heights and pie charts are CSS conic-gradients. Zero front-end dependencies, fully self-contained — no library for the sake of one chart.`,
    'ah.faq.2h': `Why three profiles?`,
    'ah.faq.2p': `seekdb / mongo / oceanbase share one application. Swap the repository implementation and AgentPersona to move from e-commerce analytics to OceanBase knowledge-graph Q&A.`,
    'ah.faq.3h': `Does the model key end up in the repo?`,
    'ah.faq.3p': `No. AGENT_MODEL_API_KEY is read from the environment only; .env.example in the repo just lists which variables are available.`,
    'ah.cta.h2': `Code, architecture diagrams and design docs are all in the repo`,
    'ah.cta.p': `Layer diagrams, the hybrid-retrieval design and the A2UI envelope format live in the README and doc/.`,

    /* ---------- GroveMQ ---------- */
    'mq.meta.title': `GroveMQ · Messages delivered, even at fleet scale | RiemannChow's Work`,
    'mq.meta.desc': `GroveMQ: an MQTT broker written in Go for AI, IoT, IIoT and connected vehicles. Actor-based core, gRPC cross-node routing, Kubernetes-native discovery, Prometheus metrics and TLS / ACL.`,
    'mq.cross': `agent-hub →`,
    'mq.appName': `GroveMQ · MQTT broker`,
    'mq.appCat': `Go · Messaging · Open source`,
    'mq.fact3': `gRPC cluster`,
    'mq.hero.title': `Devices at scale,<br><em>messages delivered.</em>`,
    'mq.hero.sub': `An MQTT broker written in Go for AI, IoT, IIoT and connected vehicles. A lightweight actor core owns every client session, gRPC routes messages between nodes, and a Kubernetes headless service lets peers find each other. TLS / ACL, durable sessions, shared subscriptions and Prometheus metrics are all included.`,
    'mq.iconAlt': `GroveMQ project icon`,
    'mq.demo.arrow': `gRPC routing · across nodes ↓`,
    'mq.demo.note': `UI illustration · ports from README`,
    'mq.demo.float': `Cross-node delivery, verified`,
    'mq.why.kicker': `WHY`,
    'mq.why.title': `As devices scale up,<br>a single-node broker breaks first.`,
    'mq.why.sub': `Sessions, subscriptions and routing share one process, scaling means adding boxes, and cross-node delivery is left as an exercise.`,
    'mq.why.1h': `Sessions pinned to one box`,
    'mq.why.1p': `A reconnect drops subscription state, and messages sent while offline have nowhere to land.`,
    'mq.why.2h': `Clusters wired by hand`,
    'mq.why.2p': `Node lists are hard-coded. A pod drift in Kubernetes breaks them, and every scale-out starts with a config edit.`,
    'mq.why.3h': `No visibility when it breaks`,
    'mq.why.3p': `Without metrics, connection counts and actor restarts are guesswork, and debugging means digging through logs.`,
    'mq.why.transition': `GroveMQ uses actors for sessions and <em>separate modules</em> for cluster routing and discovery.`,
    'mq.feat.kicker': `WHAT'S INSIDE`,
    'mq.feat.title': `From packet parsing to cluster discovery`,
    'mq.feat.sub': `Each package under pkg/ owns one job; docs/ is organised by role.`,
    'mq.feat.1h': `MQTT v3.1.1 / v5.0`,
    'mq.feat.1p': `Full CONNECT / SUBSCRIBE / PUBLISH flow, including MQTT 5.0 properties and reason codes.`,
    'mq.feat.2h': `Actor-based core`,
    'mq.feat.2p': `An OTP-inspired lightweight actor owns each session, with supervisors following the "let it crash" approach to fault tolerance.`,
    'mq.feat.3h': `Dynamic clustering`,
    'mq.feat.3p': `Nodes form a cluster automatically to share load; a cluster state manager handles cross-node message routing.`,
    'mq.feat.4h': `Kubernetes-native discovery`,
    'mq.feat.4p': `Peers are found through a headless service — no node list to update when pods move.`,
    'mq.feat.5h': `gRPC node communication`,
    'mq.feat.5p': `Strongly typed Protobuf interfaces carry routing, state synchronisation and cluster management.`,
    'mq.feat.6h': `Observability & security`,
    'mq.feat.6p': `Prometheus metrics (connections, actor restarts), TLS, ACL, durable sessions, retained messages and shared subscriptions.`,
    'mq.run.kicker': `GET IT RUNNING`,
    'mq.run.title': `Three commands, from one node to a cluster`,
    'mq.run.sub': `Requires Go 1.25+; the three-node example also needs Docker Compose v2.`,
    'mq.run.1h': `Build`,
    'mq.run.1p': `Produces the grovemq binary in the repo root. Start it from there so it can read config.yaml.`,
    'mq.run.2h': `Run a single node`,
    'mq.run.2p': `1883 accepts MQTT connections, 8081 handles cluster gRPC, 8082 exposes /metrics.`,
    'mq.run.3h': `Verify cross-node delivery`,
    'mq.run.3p': `Subscriber on node-2 (1884), publisher on node-1 (1883) — check whether the message arrives.`,
    'mq.faq.kicker': `BEFORE PRODUCTION`,
    'mq.faq.title': `A few things to change first`,
    'mq.faq.1h': `Can the default accounts go to production?`,
    'mq.faq.1p': `No. The admin / admin123 pair in config.yaml is for demos. The README explicitly asks you to replace every password, disable accounts you do not need, and review TLS and ACL settings before exposing GroveMQ to any network. The test suite uses the same credentials, so keep them in sync.`,
    'mq.faq.2h': `How do I know cross-node delivery really works?`,
    'mq.faq.2p': `cluster-test connects a subscriber to node-2 (1884) and a publisher to node-1 (1883), publishes from node-1 and checks the subscriber on node-2. The Docker Compose version uses docker-compose-cluster.yaml.`,
    'mq.faq.3h': `Do I need an extra database or registry?`,
    'mq.faq.3p': `No. Session storage is a generic KV interface with an in-memory implementation, discovery relies on a Kubernetes headless service, and a local three-node cluster starts from a script or a compose file.`,
    'mq.cta.h2': `From one node to three, one command verifies the cluster`,
    'mq.cta.p': `Protocol implementation, cluster routing, K8s manifests, chaos tooling and E2E test reports all live in docs/.`
  };

  var DICT = { zh: ZH, en: EN };
  var STORE_KEY = 'portfolio-lang';

  function readSaved() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function writeSaved(lang) {
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }
  // 支持 ?lang=en / ?lang=zh 直接分享某种语言的链接，优先级高于上次选择
  function readInitial() {
    try {
      var m = window.location.search.match(/[?&]lang=(zh|en)\b/);
      if (m) return m[1];
    } catch (e) {}
    return readSaved() === 'en' ? 'en' : 'zh';
  }

  function apply(lang) {
    lang = (lang === 'en') ? 'en' : 'zh';
    var dict = DICT[lang];
    var root = document.documentElement;
    root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
    root.setAttribute('data-lang', lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = dict[el.getAttribute('data-i18n')];
      if (val == null) continue;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    }

    var labelled = document.querySelectorAll('[data-i18n-label]');
    for (var j = 0; j < labelled.length; j++) {
      var lv = dict[labelled[j].getAttribute('data-i18n-label')];
      if (lv != null) labelled[j].setAttribute('aria-label', lv);
    }
    var alted = document.querySelectorAll('[data-i18n-alt]');
    for (var k = 0; k < alted.length; k++) {
      var av = dict[alted[k].getAttribute('data-i18n-alt')];
      if (av != null) alted[k].setAttribute('alt', av);
    }

    var page = document.body.getAttribute('data-page') || 'home';
    var title = dict[page + '.meta.title'];
    if (title) {
      document.title = title;
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
    }
    var desc = dict[page + '.meta.desc'];
    if (desc) {
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute('content', desc);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
    }

    var buttons = document.querySelectorAll('.lang-switch button');
    for (var m = 0; m < buttons.length; m++) {
      buttons[m].setAttribute('aria-pressed',
        String(buttons[m].getAttribute('data-lang') === lang));
    }
    var sw = document.querySelector('.lang-switch');
    if (sw) sw.setAttribute('aria-label', dict['common.lang.aria']);

    writeSaved(lang);
  }

  apply(readInitial());

  document.addEventListener('click', function (e) {
    var node = e.target;
    while (node && node !== document) {
      if (node.tagName === 'BUTTON' && node.hasAttribute('data-lang')) {
        apply(node.getAttribute('data-lang'));
        // 手动切换后去掉 URL 上的 lang 参数，避免刷新时又跳回链接指定的语言
        try {
          if (window.location.search.indexOf('lang=') >= 0) {
            window.history.replaceState(null, '',
              window.location.pathname + window.location.hash);
          }
        } catch (err) {}
        return;
      }
      node = node.parentNode;
    }
  });
})();
