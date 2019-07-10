module.exports = {
  title: "刘晓北",
  description: '一个前端狗记录一点小事情',
  dest: 'public',
  head: [
    ['link', {
      rel: 'icon',
      href: 'theme/favicon.ico'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    nav: [{
        text: '首页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '时间轴',
        link: '/timeLine/',
        icon: 'reco-date'
      },
      {
        text: '外链',
        icon: 'reco-message',
        items: [
          // {
          //   text: 'NPM',
          //   link: 'https://www.npmjs.com/~reco_luan',
          //   icon: 'reco-npm'
          // },
          {
            text: 'GitHub',
            link: 'https://github.com/TankRyze',
            icon: 'reco-github'
          },
          // {
          //   text: '简书',
          //   link: 'https://www.jianshu.com/u/cd674a19515e',
          //   icon: 'reco-jianshu'
          // },
          // {
          //   text: 'CSDN',
          //   link: 'https://blog.csdn.net/recoluan',
          //   icon: 'reco-csdn'
          // },
          {
            text: '博客园',
            link: 'https://www.cnblogs.com/ryze/',
            icon: 'reco-bokeyuan'
          },
          // {
          //   text: 'WeChat',
          //   link: 'https://mp.weixin.qq.com/s/mXFqeUTegdvPliXknAAG_A',
          //   icon: 'reco-wechat'
          // },
        ]
      }
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    logo: 'headImg/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '刘晓北',
    // 备案号
    // record: 'xxxx',
    // 项目开始时间
    startYear: '2016',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
    /**
     * huawei 是否显示’华为‘文案 true显示，false不显示
     */
    huawei: false
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart']
};
