import 'dotenv/config'; // dotenv を使う場合
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'your-app-name',
    slug: 'your-app-slug',
    extra: {
        openAIApiKey: process.env.OPENAI_API_KEY, // .env から読み込み
    },
    // ... その他の設定 ...
});