# Configuration

Add your Dropbox developer API access token in a `config.ts` file at the root of this folder. Tasker:tm: will pick this file up at runtime and use it to associate a Dropbox user account to the application using a standard OAuth flow.

<br>

> By generating an access token, you will be able to make API calls for your own account without going through the authorization flow.

<br>

```typescript
export default {
    accessToken: "<enter your access token here>"
}
```
<br>

[Dropbox developer apps panel](https://www.dropbox.com/developers/apps/)

[Link to more information](https://www.dropbox.com/developers/reference/oauth-guide)