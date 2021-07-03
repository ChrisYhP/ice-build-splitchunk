import { IPlugin } from '@alib/build-scripts';
import { SplitChunksOptions } from 'webpack-chain';

const plugin: IPlugin = ({ registerTask, onGetWebpackConfig }, options: SplitChunksOptions) => {
  onGetWebpackConfig((config) => {
    config.optimization.splitChunks({
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 300000, // 依赖包超过300000bit将被单独打包
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: { context: string; }) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            return `chunk.${packageName.replace('@', '')}`
          },
          priority: 10
        }
      },
      ...options,
    })
  });
};

export default plugin;