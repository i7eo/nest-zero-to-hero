# Nestjs Login Auth

> 登录鉴权

## 流程描述

![nest-login-auth](./nest-login-auth-1.png)

## 前置知识

![nest-login-auth-desc](./nest-login-auth-2.png)

- session/cookie：服务端将用户信息存入 session 生成唯一标识传给前端，前端将其存储在 cookie 中。

  1. 优点：简单易扩展

  2. 缺点：安全性低，多服务器间同步 session 困难（借助 redis），跨平台困难

- JWT：json web token，最大好处是无状态。不需要在浏览器或者服务端存储数据。

  1. 优点：易扩展，支持跨端，安全，承载信息丰富（json 形式易于读写）

  2. 缺点：刷新与过期处理，payload 不宜过大否则影响 http 传输效率，容易被中间人拿到 token 进行破解攻击

- OAuth：一般指第三方授权登录，如 google 登录，wechat 登录等。

  1. 优点：开放、安全、简单、权限指定

  2. 缺点：需要增加授权服务器，增加网络请求

## JWT

### 组成

JWT 全称 JSON WEB TOKEN, 由 header、payload、signature 组成。

1. Header: `{ "alg": "HS256", "typ": "JWT" }` 加密方式与 token 类型

2. Payload: `{ "name": "admin", "role": "admin", "expireTime": "xxx" }` 用户信息与 token 过期时间

3. Signature: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)` 使用 Header 规定的加密方式对经过 base64 处理的 Header 与 Payload 进行加密处理

### 特点

1. 防 CSRF (主要是带上 cookie 伪造请求进行攻击)

2. 适合移动端（App，即对 cookie 支持不够或者设备上不支持 cookie 的情况）

3. 无状态，对传送数据编码，安全性有保障

### 样子

> 来源于 jwt.io 在线生成

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVUaW1lIjoiMjAyMy0xMS0yNyAxNzowMCIsIm5hbWUiOiJpN2VvIiwicm9sZSI6ImFkbWluIn0.s_lHMQ_5K-t5aYCpx8PSyIYlNrtxTGIqjmNbBmF3Gms
```

### 工作原理

![nest-login-auth-maker](./nest-login-auth-3.png)

- 其中前端将登陆成功返回的 token 存储在 HTTP Header 中，每次请求都携带。后端读取到 HTTP Header 中的 token 信息，通过签名时的 `secret` 将其解密验证其是否是有效的 token

- 中间人此时如果拿到 token 在没过期的情况下确实拥有 token 对应账户的权限，但一般中间人（代码攻击、爬虫等）抓取到 HTTPS 站点信息后需要 ssl 令牌才能解密。服务端如果能记录当前 token 属于哪个账户当然更好，但因为 JWT 无状态的特性所以这个并没有实现
