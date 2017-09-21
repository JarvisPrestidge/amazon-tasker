# Configuration

Add your Dropbox developer API access token in a `config.ts` file at the root of this folder. **Tasker**:registered: will pick up these values at runtime and use them to associate a Dropbox account to the application (using OAuth2).

<br>

> By generating an access token, you will be able to make API calls for your own account without going through the authorization flow.

<br>

```typescript
export const dropbox = {
    ACCESS_TOKEN: "<enter access token>",
    LOCAL_SAVE_FILE_PATH: "<enter local save file path>",
    REMOTE_DROPBOX_FILE_PATH: "<enter remote dropbox path>",
};

export const gmail = {
    USER: "<enter gmail address>",
    CLIENT_ID: "<enter google app clientId>",
    CLIENT_SECRET: "<enter google app clientSecret>",
    REFRESH_TOKEN: "<enter oauth2 refresh token>",
    ACCESS_TOKEN: "<enter oauth2 access token>"
};
```
<br>

You can get your dropbox access token from the [dropbox developer apps panel](https://www.dropbox.com/developers/apps/).

You can get your google oauth2 details fromm their [developer console site](https://console.developers.google.com).

[Link to more information](https://www.dropbox.com/developers/reference/oauth-guide)
