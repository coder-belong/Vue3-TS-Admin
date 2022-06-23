const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
	publicPath: "./",
	lintOnSave: false,
	configureWebpack: {
		plugins: [
			AutoImport({
				resolvers: [
					// 自动按需配置
					ElementPlusResolver()
				]
			}),
			Components({
				resolvers: [
					ElementPlusResolver()
				]
			})
		]
	}
};
