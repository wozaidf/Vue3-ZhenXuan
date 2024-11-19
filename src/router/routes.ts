// 对外暴露常量路由
export const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login", //用于路由权限的字段
    meta: {
      title: "登录",
      hidden: true, // 是否隐藏在左侧导航那
      requiresAuth: false, // 是否需要权限访问
    },
  },
  {
    // 登录成功后展示数据的路由
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    redirect: "/home",
    meta: {
      title: "",
      hidden: false,
      icon: "House",
      requiresAuth: true,
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页", // 导航菜单名称
          hidden: false,
          icon: "House", // 导航菜单的图标
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Monitor",
      requiresAuth: true,
    },
  },
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"), // 将这级路由挂载到layout组件上，让这级路由的子路由成为layout的子路由
    // 还有一种解释就是：复用layout组件，layout组件有两个路由（只不过路劲不一样），
    // *** 下面的子路由都可以显现在layout的RouterViews上了
    name: "Acl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
      requiresAuth: true,
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
          requiresAuth: true,
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "Briefcase",
          requiresAuth: true,
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          hidden: true,
          icon: "Menu",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/spu",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
      requiresAuth: true,
    },
    children: [
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "spu管理",
          hidden: false,
          icon: "Calendar",
          requiresAuth: true,
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "attr管理",
          hidden: false,
          icon: "ChromeFilled",
          requiresAuth: true,
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "sku管理",
          hidden: false,
          icon: "Orange",
          requiresAuth: true,
        },
      },
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingTrolley",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
      requiresAuth: false,
    },
  },
  {
    // 匹配任意路由，匹配除上面以外的路由（通常写在最后，最后匹配）
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "NotFound",
    meta: {
      title: "任意",
      hidden: true,
    },
  },
];
