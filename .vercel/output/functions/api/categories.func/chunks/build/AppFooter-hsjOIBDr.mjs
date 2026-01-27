import { F as useRoute, a as __nuxt_component_0$1, e as _sfc_main$8, g as _sfc_main$e, n as navigateTo } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isScrolled = ref(false);
    function goToLogin() {
      navigateTo("/auth/login");
    }
    const items = computed(() => [
      { label: "Accueil", to: "/", active: route.path === "/" },
      { label: "Articles", to: "/blog", active: route.path.startsWith("/blog") },
      { label: "Galerie", to: "/gallery", active: route.path.startsWith("/gallery") },
      { label: "Contact", to: "/contact", active: route.path.startsWith("/contact") }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UButton = _sfc_main$8;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          unref(isScrolled) ? "bg-white/95 backdrop-blur-xl shadow-2xl py-4" : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm py-6"
        ]
      }, _attrs))}><div class="container mx-8 px-"><div class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "group flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([
              "font-gravitas text-2xl font-bold tracking-tight transition-all duration-300",
              unref(isScrolled) ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600" : "text-white drop-shadow-lg"
            ])}"${_scopeId}> Luxe &amp; Élégance </span>`);
          } else {
            return [
              createVNode("span", {
                class: [
                  "font-gravitas text-2xl font-bold tracking-tight transition-all duration-300",
                  unref(isScrolled) ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600" : "text-white drop-shadow-lg"
                ]
              }, " Luxe & Élégance ", 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-8"><!--[-->`);
      ssrRenderList(unref(items), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: [
            "relative font-medium text-sm uppercase tracking-wider transition-all duration-300",
            item.active ? unref(isScrolled) ? "text-purple-600" : "text-white font-semibold" : unref(isScrolled) ? "text-gray-700 hover:text-purple-600" : "text-white/80 hover:text-white"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)} `);
              if (item.active) {
                _push2(`<span class="${ssrRenderClass([
                  "absolute -bottom-1 left-0 h-0.5 w-full transition-colors",
                  unref(isScrolled) ? "bg-purple-600" : "bg-white"
                ])}"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createTextVNode(toDisplayString(item.label) + " ", 1),
                item.active ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: [
                    "absolute -bottom-1 left-0 h-0.5 w-full transition-colors",
                    unref(isScrolled) ? "bg-purple-600" : "bg-white"
                  ]
                }, null, 2)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex items-center gap-3 -mr-22">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: unref(isScrolled) ? "primary" : "neutral",
        variant: unref(isScrolled) ? "ghost" : "soft",
        icon: "i-heroicons-magnifying-glass",
        size: "lg",
        square: "",
        class: "hidden sm:flex"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "lg",
        class: "hidden lg:flex font-semibold rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-purple-100/50 dark:hover:bg-indigo-900/30",
        onClick: ($event) => goToLogin()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` S&#39;abonner `);
          } else {
            return [
              createTextVNode(" S'abonner ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: unref(isScrolled) ? "primary" : "neutral",
        variant: unref(isScrolled) ? "ghost" : "soft",
        icon: "i-heroicons-bars-3",
        size: "lg",
        square: "",
        class: "md:hidden"
      }, null, _parent));
      _push(`</div></div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const navigation = {
      discover: [
        { label: "Accueil", to: "/" },
        { label: "Articles", to: "/blog" },
        { label: "Tendances", to: "/trends" },
        { label: "Galerie", to: "/gallery" }
      ],
      about: [
        { label: "À propos", to: "/about" },
        { label: "Équipe", to: "/team" },
        { label: "Partenaires", to: "/partners" },
        { label: "Carrières", to: "/careers" }
      ],
      resources: [
        { label: "Guide déco", to: "/guides" },
        { label: "Inspiration", to: "/inspiration" },
        { label: "FAQ", to: "/faq" },
        { label: "Blog", to: "/blog" }
      ],
      legal: [
        { label: "Mentions légales", to: "/legal" },
        { label: "Politique de confidentialité", to: "/privacy" },
        { label: "CGU", to: "/terms" },
        { label: "Cookies", to: "/cookies" }
      ]
    };
    const socialLinks = [
      { icon: "i-simple-icons-instagram", label: "Instagram", to: "https://instagram.com", color: "text-pink-600" },
      { icon: "i-simple-icons-pinterest", label: "Pinterest", to: "https://pinterest.com", color: "text-red-600" },
      { icon: "i-simple-icons-facebook", label: "Facebook", to: "https://facebook.com", color: "text-blue-600" },
      { icon: "i-simple-icons-twitter", label: "Twitter", to: "https://twitter.com", color: "text-sky-500" },
      { icon: "i-simple-icons-youtube", label: "YouTube", to: "https://youtube.com", color: "text-red-600" }
    ];
    const email = ref("");
    const isSubscribing = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" }, _attrs))}><div class="relative h-16"><svg class="absolute bottom-0 w-full h-16 text-slate-50" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="currentColor" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg></div><div class="container mx-auto px-6 pt-16 pb-8"><div class="grid md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/10"><div class="space-y-6"><div class="flex items-center gap-3"><div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-home-modern",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><div><h2 class="font-gravitas text-3xl font-bold">Luxe &amp; Design</h2><p class="text-purple-300 text-sm">L&#39;art de vivre</p></div></div><p class="text-gray-300 leading-relaxed max-w-md"> Découvrez l&#39;univers du design d&#39;intérieur haut de gamme, des demeures d&#39;exception et des tendances qui façonnent l&#39;art de vivre contemporain. </p><div class="flex gap-3 pt-4"><!--[-->`);
      ssrRenderList(socialLinks, (social) => {
        _push(`<a${ssrRenderAttr("href", social.to)} target="_blank" rel="noopener noreferrer" class="group relative"><div class="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div><div class="relative bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: social.icon,
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</div></a>`);
      });
      _push(`<!--]--></div></div><div id="newsletter-form" class="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"><div class="flex items-center gap-2 mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold">Newsletter Exclusive</h3></div><p class="text-gray-300 text-sm mb-6"> Recevez nos dernières inspirations, tendances et articles directement dans votre boîte mail. <span class="text-purple-400 font-semibold">100% sans spam.</span></p><form class="space-y-3"><div class="flex gap-2"><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="votre@email.com" required class="flex-1 px-4 py-3 bg-white/10 border border-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full">`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        size: "lg",
        loading: unref(isSubscribing),
        icon: "i-heroicons-paper-airplane",
        trailing: "",
        class: "bg-amber-400 hover:bg-amber-500 rounded-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isSubscribing) ? "Envoi..." : "S'abonner")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isSubscribing) ? "Envoi..." : "S'abonner"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-xs text-gray-400"> En vous abonnant, vous acceptez notre `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-purple-400 hover:text-purple-300 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` politique de confidentialité `);
          } else {
            return [
              createTextVNode(" politique de confidentialité ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form></div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"><!--[-->`);
      ssrRenderList(navigation, (section, name) => {
        _push(`<div><h4 class="font-semibold text-lg mb-4 text-purple-300">${ssrInterpolate(name.charAt(0).toUpperCase() + name.slice(1))}</h4><ul class="space-y-3"><!--[-->`);
        ssrRenderList(section, (link) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.to,
            class: "text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chevron-right",
                    class: "w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all"
                  }),
                  createTextVNode(" " + toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div><div class="pt-8 border-t border-white/10"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-center md:text-left"><p class="text-gray-400 text-sm"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} <span class="font-semibold text-white">Luxe &amp; Design</span>. Tous droits réservés. </p><p class="text-gray-400 text-xs mt-1"> Conçu avec `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-heart-solid",
        class: "w-3 h-3 inline text-red-500"
      }, null, _parent));
      _push(` par votre équipe </p></div><div class="flex flex-wrap justify-center gap-4 text-xs"><div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-4 h-4 text-purple-400"
      }, null, _parent));
      _push(`<span class="text-gray-300">+10K lecteurs</span></div><div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-newspaper",
        class: "w-4 h-4 text-purple-400"
      }, null, _parent));
      _push(`<span class="text-gray-300">+500 articles</span></div><div class="flex items-center gap-2 bg-white bg-opacity-5 px-4 py-2 rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-globe-alt",
        class: "w-4 h-4 text-purple-400"
      }, null, _parent));
      _push(`<span class="text-gray-300">20+ pays</span></div></div></div></div></div><button class="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 z-40" aria-label="Retour en haut">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-up",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</button></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main, { __name: "AppFooter" });

export { __nuxt_component_6 as _, __nuxt_component_0 as a };
//# sourceMappingURL=AppFooter-hsjOIBDr.mjs.map
