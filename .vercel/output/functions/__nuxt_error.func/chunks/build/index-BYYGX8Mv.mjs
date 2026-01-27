import { defineComponent, computed, ref, mergeProps, withCtx, createVNode, createTextVNode, withAsyncContext, unref, toDisplayString, watch, createBlock, createCommentVNode, openBlock, Fragment, renderList, renderSlot, isRef, shallowRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, f as __nuxt_component_4, e as _sfc_main$8, g as _sfc_main$e, a as __nuxt_component_0$1$1, b as useLocale, c as useAppConfig, d as useForwardProps, t as tv, P as Primitive, n as navigateTo } from './server.mjs';
import { reactivePick } from '@vueuse/core';
import { _ as __nuxt_component_6, a as __nuxt_component_0$1 } from './AppFooter-hsjOIBDr.mjs';
import { useRoute } from 'vue-router';
import { _ as _sfc_main$4 } from './Input-DmGe_2Wq.mjs';
import { u as useFetch } from './fetch-IjNZGg20.mjs';
import '../_/nitro.mjs';
import 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:os';
import 'node:tty';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:child_process';
import 'node:fs/promises';
import 'node:util';
import 'node:process';
import 'node:async_hooks';
import 'path';
import 'fs';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'chokidar';
import 'anymatch';
import 'tailwindcss/colors';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

function isObject(subject) {
  return Object.prototype.toString.call(subject) === "[object Object]";
}
function isRecord(subject) {
  return isObject(subject) || Array.isArray(subject);
}
function areOptionsEqual(optionsA, optionsB) {
  const optionsAKeys = Object.keys(optionsA);
  const optionsBKeys = Object.keys(optionsB);
  if (optionsAKeys.length !== optionsBKeys.length) return false;
  const breakpointsA = JSON.stringify(Object.keys(optionsA.breakpoints || {}));
  const breakpointsB = JSON.stringify(Object.keys(optionsB.breakpoints || {}));
  if (breakpointsA !== breakpointsB) return false;
  return optionsAKeys.every((key) => {
    const valueA = optionsA[key];
    const valueB = optionsB[key];
    if (typeof valueA === "function") return `${valueA}` === `${valueB}`;
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB;
    return areOptionsEqual(valueA, valueB);
  });
}
function sortAndMapPluginToOptions(plugins) {
  return plugins.concat().sort((a, b) => a.name > b.name ? 1 : -1).map((plugin) => plugin.options);
}
function arePluginsEqual(pluginsA, pluginsB) {
  if (pluginsA.length !== pluginsB.length) return false;
  const optionsA = sortAndMapPluginToOptions(pluginsA);
  const optionsB = sortAndMapPluginToOptions(pluginsB);
  return optionsA.every((optionA, index2) => {
    const optionB = optionsB[index2];
    return areOptionsEqual(optionA, optionB);
  });
}
function emblaCarouselVue(options = {}, plugins = []) {
  const isRefOptions = isRef(options);
  const isRefPlugins = isRef(plugins);
  let storedOptions = isRefOptions ? options.value : options;
  let storedPlugins = isRefPlugins ? plugins.value : plugins;
  const emblaNode = shallowRef();
  const emblaApi = shallowRef();
  function reInit() {
    if (!emblaApi.value) return;
    emblaApi.value.reInit(storedOptions, storedPlugins);
  }
  if (isRefOptions) {
    watch(options, (newOptions) => {
      if (areOptionsEqual(storedOptions, newOptions)) return;
      storedOptions = newOptions;
      reInit();
    });
  }
  if (isRefPlugins) {
    watch(plugins, (newPlugins) => {
      if (arePluginsEqual(storedPlugins, newPlugins)) return;
      storedPlugins = newPlugins;
      reInit();
    });
  }
  return [emblaNode, emblaApi];
}
emblaCarouselVue.globalOptions = void 0;
const theme = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-accented rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
        "next": "end-4 sm:-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "data-[state=active]:bg-inverted"
      }
    }
  }
};
const _sfc_main$3 = {
  __name: "UCarousel",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    prev: { type: Object, required: false },
    prevIcon: { type: null, required: false },
    next: { type: Object, required: false },
    nextIcon: { type: null, required: false },
    arrows: { type: Boolean, required: false, default: false },
    dots: { type: Boolean, required: false, default: false },
    orientation: { type: null, required: false, default: "horizontal" },
    items: { type: Array, required: false },
    autoplay: { type: [Boolean, Object], required: false, default: false },
    autoScroll: { type: [Boolean, Object], required: false, default: false },
    autoHeight: { type: [Boolean, Object], required: false, default: false },
    classNames: { type: [Boolean, Object], required: false, default: false },
    fade: { type: [Boolean, Object], required: false, default: false },
    wheelGestures: { type: [Boolean, Object], required: false, default: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    align: { type: [String, Function], required: false, default: "center" },
    containScroll: { type: [Boolean, String], required: false, default: "trimSnaps" },
    slidesToScroll: { type: [String, Number], required: false, default: 1 },
    dragFree: { type: Boolean, required: false, default: false },
    dragThreshold: { type: Number, required: false, default: 10 },
    inViewThreshold: { type: null, required: false, default: 0 },
    loop: { type: Boolean, required: false, default: false },
    skipSnaps: { type: Boolean, required: false, default: false },
    duration: { type: Number, required: false, default: 25 },
    startIndex: { type: Number, required: false, default: 0 },
    watchDrag: { type: [Boolean, Function], required: false, default: true },
    watchResize: { type: [Boolean, Function], required: false, default: true },
    watchSlides: { type: [Boolean, Function], required: false, default: true },
    watchFocus: { type: [Boolean, Function], required: false, default: true },
    active: { type: Boolean, required: false, default: true },
    breakpoints: { type: Object, required: false, default: () => ({}) }
  },
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { dir, t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
    const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
    const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
    const stopAutoplayOnInteraction = computed(() => {
      if (typeof props.autoplay === "boolean") {
        return true;
      }
      return props.autoplay.stopOnInteraction ?? true;
    });
    const stopAutoScrollOnInteraction = computed(() => {
      if (typeof props.autoScroll === "boolean") {
        return true;
      }
      return props.autoScroll.stopOnInteraction ?? true;
    });
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.carousel || {} })({
      orientation: props.orientation
    }));
    const options = computed(() => ({
      ...props.fade ? { align: "center", containScroll: false } : {},
      ...rootProps.value,
      axis: props.orientation === "horizontal" ? "x" : "y",
      direction: dir.value === "rtl" ? "rtl" : "ltr"
    }));
    const plugins = ref([]);
    async function loadPlugins() {
      const emblaPlugins = [];
      if (props.autoplay) {
        const AutoplayPlugin = await import('./embla-carousel-autoplay.esm-DpLNY5i4.mjs').then((r) => r.default);
        emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
      }
      if (props.autoScroll) {
        const AutoScrollPlugin = await import('./embla-carousel-auto-scroll.esm-CIFmKTyb.mjs').then((r) => r.default);
        emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
      }
      if (props.autoHeight) {
        const AutoHeightPlugin = await import('./embla-carousel-auto-height.esm-CXT4Elzl.mjs').then((r) => r.default);
        emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
      }
      if (props.classNames) {
        const ClassNamesPlugin = await import('./embla-carousel-class-names.esm-qIpKPfku.mjs').then((r) => r.default);
        emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
      }
      if (props.fade) {
        const FadePlugin = await import('./embla-carousel-fade.esm-CPiEa60R.mjs').then((r) => r.default);
        emblaPlugins.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
      }
      if (props.wheelGestures) {
        const { WheelGesturesPlugin } = await import('./embla-carousel-wheel-gestures.esm-qEB-Bcxo.mjs');
        emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
      }
      plugins.value = emblaPlugins;
    }
    watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
      await loadPlugins();
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { immediate: true });
    const [emblaRef, emblaApi] = emblaCarouselVue(options, plugins);
    watch(options, () => {
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { flush: "post" });
    function stopOnInteraction() {
      if (stopAutoplayOnInteraction.value) {
        emblaApi.value?.plugins().autoplay?.stop();
      }
      if (stopAutoScrollOnInteraction.value) {
        emblaApi.value?.plugins().autoScroll?.stop();
      }
    }
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
      stopOnInteraction();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
      stopOnInteraction();
    }
    function scrollTo(index2) {
      emblaApi.value?.scrollTo(index2);
    }
    function onKeyDown(event) {
      let prevKey;
      let nextKey;
      if (props.orientation === "horizontal") {
        prevKey = dir.value === "ltr" ? "ArrowLeft" : "ArrowRight";
        nextKey = dir.value === "ltr" ? "ArrowRight" : "ArrowLeft";
      } else {
        prevKey = "ArrowUp";
        nextKey = "ArrowDown";
      }
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
        return;
      }
      if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    const selectedIndex = ref(0);
    const scrollSnaps = ref([]);
    function isCarouselItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      emblaRef,
      emblaApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        role: "region",
        "aria-roledescription": "carousel",
        "data-orientation": __props.orientation,
        tabindex: "0",
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        onKeydown: onKeyDown
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId}><div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item, index2) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({ key: index2 }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
              }))}${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {
                item,
                index: index2
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (__props.arrows || __props.dots) {
              _push2(`<div data-slot="controls" class="${ssrRenderClass(ui.value.controls({ class: props.ui?.controls }))}"${_scopeId}>`);
              if (__props.arrows) {
                _push2(`<div data-slot="arrows" class="${ssrRenderClass(ui.value.arrows({ class: props.ui?.arrows }))}"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$8, mergeProps({
                  disabled: !canScrollPrev.value,
                  icon: prevIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.prev")
                }, typeof __props.prev === "object" ? __props.prev : void 0, {
                  "data-slot": "prev",
                  class: ui.value.prev({ class: props.ui?.prev }),
                  onClick: scrollPrev
                }), null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$8, mergeProps({
                  disabled: !canScrollNext.value,
                  icon: nextIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.next")
                }, typeof __props.next === "object" ? __props.next : void 0, {
                  "data-slot": "next",
                  class: ui.value.next({ class: props.ui?.next }),
                  onClick: scrollNext
                }), null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.dots) {
                _push2(`<div role="tablist"${ssrRenderAttr("aria-label", unref(t)("carousel.dots"))} data-slot="dots" class="${ssrRenderClass(ui.value.dots({ class: props.ui?.dots }))}"${_scopeId}><!--[-->`);
                ssrRenderList(scrollSnaps.value, (_2, index2) => {
                  _push2(`<button type="button" role="tab"${ssrRenderAttr("aria-label", unref(t)("carousel.goto", { slide: index2 + 1 }))}${ssrRenderAttr("aria-selected", selectedIndex.value === index2)} data-slot="dot" class="${ssrRenderClass(ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index2 }))}"${ssrRenderAttr("data-state", selectedIndex.value === index2 ? "active" : void 0)}${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                ref_key: "emblaRef",
                ref: emblaRef,
                "data-slot": "viewport",
                class: ui.value.viewport({ class: props.ui?.viewport })
              }, [
                createVNode("div", {
                  "data-slot": "container",
                  class: ui.value.container({ class: props.ui?.container })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index2) => {
                    return openBlock(), createBlock("div", mergeProps({ key: index2 }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                      "data-slot": "item",
                      class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
                    }), [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index: index2
                      })
                    ], 16);
                  }), 128))
                ], 2)
              ], 2),
              __props.arrows || __props.dots ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "controls",
                class: ui.value.controls({ class: props.ui?.controls })
              }, [
                __props.arrows ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "arrows",
                  class: ui.value.arrows({ class: props.ui?.arrows })
                }, [
                  createVNode(_sfc_main$8, mergeProps({
                    disabled: !canScrollPrev.value,
                    icon: prevIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.prev")
                  }, typeof __props.prev === "object" ? __props.prev : void 0, {
                    "data-slot": "prev",
                    class: ui.value.prev({ class: props.ui?.prev }),
                    onClick: scrollPrev
                  }), null, 16, ["disabled", "icon", "aria-label", "class"]),
                  createVNode(_sfc_main$8, mergeProps({
                    disabled: !canScrollNext.value,
                    icon: nextIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.next")
                  }, typeof __props.next === "object" ? __props.next : void 0, {
                    "data-slot": "next",
                    class: ui.value.next({ class: props.ui?.next }),
                    onClick: scrollNext
                  }), null, 16, ["disabled", "icon", "aria-label", "class"])
                ], 2)) : createCommentVNode("", true),
                __props.dots ? (openBlock(), createBlock("div", {
                  key: 1,
                  role: "tablist",
                  "aria-label": unref(t)("carousel.dots"),
                  "data-slot": "dots",
                  class: ui.value.dots({ class: props.ui?.dots })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(scrollSnaps.value, (_2, index2) => {
                    return openBlock(), createBlock("button", {
                      key: index2,
                      type: "button",
                      role: "tab",
                      "aria-label": unref(t)("carousel.goto", { slide: index2 + 1 }),
                      "aria-selected": selectedIndex.value === index2,
                      "data-slot": "dot",
                      class: ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index2 }),
                      "data-state": selectedIndex.value === index2 ? "active" : void 0,
                      onClick: ($event) => scrollTo(index2)
                    }, null, 10, ["aria-label", "aria-selected", "data-state", "onClick"]);
                  }), 128))
                ], 10, ["aria-label"])) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.3.0_a492382add45b93319e14cad668e3015/node_modules/@nuxt/ui/dist/runtime/components/Carousel.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeaderHero",
  __ssrInlineRender: true,
  setup(__props) {
    function goToLogin() {
      navigateTo("/blog");
    }
    function goToTendance() {
      const section = (void 0).getElementById("newsletter-form");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    const items = [
      "https://picsum.photos/640/640?random=1",
      "https://picsum.photos/640/640?random=2",
      "https://picsum.photos/640/640?random=3",
      "https://picsum.photos/640/640?random=4",
      "https://picsum.photos/640/640?random=5",
      "https://picsum.photos/640/640?random=6"
    ];
    const route = useRoute();
    const navItems = computed(() => [
      { label: "Home", to: "/", active: route.path === "/" },
      { label: "Posts", to: "/blog", active: route.path.startsWith("/blog") },
      { label: "Work", to: "/work", active: route.path.startsWith("/work") },
      { label: "Features", to: "/features", active: route.path.startsWith("/features") }
    ]);
    const displayedText = ref("");
    const showElements = ref({
      badge: false,
      h1: false,
      subtitle: false,
      categories: false,
      buttons: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$3;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_UButton = _sfc_main$8;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-wrapper relative" }, _attrs))} data-v-81168d02><div class="hero-bg absolute inset-0 z-0" data-v-81168d02>`);
      _push(ssrRenderComponent(_component_UCarousel, {
        fade: "",
        arrows: "",
        dots: "",
        items,
        class: "w-full h-full",
        autoplay: "",
        "autoplay-speed": 3e3
      }, {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: item,
              alt: "Hero carousel",
              class: "w-full h-full object-cover"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtImg, {
                src: item,
                alt: "Hero carousel",
                class: "w-full h-full object-cover"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" data-v-81168d02></div></div>`);
      _push(ssrRenderComponent(__nuxt_component_0$1, {
        "nav-items": navItems.value,
        class: "relative z-10"
      }, null, _parent));
      _push(`<div class="hero-content relative z-10 container mx-auto px-4 pt-5 pb-11 min-h-screen flex flex-col justify-center items-center text-center text-white" data-v-81168d02><div class="flex items-left gap-3" data-v-81168d02></div><span class="${ssrRenderClass([
        "inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-200 text-sm mb-3 transition-all duration-700",
        showElements.value.badge ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      ])}" data-v-81168d02> ✨ Magazine de décoration haut de gamme </span><div class="${ssrRenderClass(["transition-opacity duration-500", showElements.value.h1 ? "opacity-100" : "opacity-0"])}" data-v-81168d02><h1 class="font-nova-square text-5xl md:text-8xl font-bold mb-4 leading-tight" data-v-81168d02><!--[-->`);
      ssrRenderList(displayedText.value.split("\n"), (line, i) => {
        _push(`<!--[-->${ssrInterpolate(line)} `);
        if (i === 0) {
          _push(`<br data-v-81168d02>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><span class="cursor-blink" data-v-81168d02>|</span></h1></div><p class="${ssrRenderClass([
        "font-cookie text-xl md:text-2xl mb-8 max-w-4xl leading-relaxed transition-all duration-700",
        showElements.value.subtitle ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
      ])}" data-v-81168d02> Inspirez-vous des plus belles réalisations en design d&#39;intérieur,<br class="hidden md:block" data-v-81168d02> des salons raffinés aux demeures d&#39;exception </p><div class="${ssrRenderClass([
        "flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700",
        showElements.value.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      ])}" data-v-81168d02><!--[-->`);
      ssrRenderList(["Salons contemporains", "Maisons de maître", "Penthouses", "Villas de prestige"], (cat, index2) => {
        _push(`<span class="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105" style="${ssrRenderStyle({
          transitionDelay: showElements.value.categories ? `${index2 * 100}ms` : "0ms",
          opacity: showElements.value.categories ? 1 : 0,
          transform: showElements.value.categories ? "translateY(0)" : "translateY(20px)"
        })}" data-v-81168d02>${ssrInterpolate(cat)}</span>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([
        "flex flex-col sm:flex-row gap-4 transition-all duration-700",
        showElements.value.buttons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      ])}" data-v-81168d02>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "xl",
        color: "primary",
        class: "px-10 py-4 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full",
        icon: "i-heroicons-home-modern",
        trailing: "",
        onClick: goToLogin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explorer les tendances `);
          } else {
            return [
              createTextVNode(" Explorer les tendances ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "xl",
        variant: "soft",
        class: "px-10 py-4 bg-white text-gray-900 hover:bg-white/90 text-base font-semibold rounded-full",
        icon: "i-heroicons-bookmark",
        trailing: "",
        onClick: goToTendance
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` S&#39;abonner à la newsletter `);
          } else {
            return [
              createTextVNode(" S'abonner à la newsletter ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeaderHero.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-81168d02"]]), { __name: "AppHeaderHero" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppListe",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/posts", "$BJxgy_ydjZ")), __temp = await __temp, __restore(), __temp);
    console.log("Fetched posts:", posts.value);
    const trendingPosts = computed(() => (posts.value || []).slice(0, 3));
    const regularPosts = computed(() => (posts.value || []).slice(3));
    const currentSlide = ref(0);
    const renovationNews = [
      {
        title: "Rénovation énergétique : nouvelles aides 2025",
        date: "Aujourd'hui",
        type: "Actualité"
      },
      {
        title: "Les matériaux écologiques les plus prisés",
        date: "Hier",
        type: "Guide"
      },
      {
        title: "Budget rénovation : comment optimiser vos coûts",
        date: "Il y a 2 jours",
        type: "Conseil"
      }
    ];
    const usefulLinks = [
      { title: "Guide des architectes d'intérieur", url: "/guides/architectes" },
      { title: "Calculateur de budget rénovation", url: "/outils/calculateur" },
      { title: "Tendances déco Instagram", url: "/tendances/instagram" },
      { title: "Salons et expositions 2025", url: "/evenements/salons" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      const _component_NuxtImg = __nuxt_component_4;
      const _component_NuxtLink = __nuxt_component_0$1$1;
      const _component_UButton = _sfc_main$8;
      const _component_UInput = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-8"><div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"><div class="p-6 bg-gradient-to-r from-purple-600 to-indigo-600"><div class="flex items-center gap-2 text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-fire",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`<h2 class="text-2xl font-bold underline">Tendances de la semaine</h2></div></div><div class="relative"><div class="relative h-96 overflow-hidden"><!--[-->`);
      ssrRenderList(unref(trendingPosts), (post, index2) => {
        _push(`<div class="${ssrRenderClass([
          "absolute inset-0 transition-all duration-500",
          index2 === currentSlide.value ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        ])}">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: post.image,
          alt: post.title,
          class: "w-full h-full object-cover"
        }, null, _parent));
        _push(`<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/blog/${post.id}`,
          class: "absolute bottom-0 left-0 right-0 p-8 text-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-block px-3 py-1 bg-purple-500 rounded-full text-xs font-semibold mb-3"${_scopeId}>${ssrInterpolate(post.sub_category_id?.name || "Article")}</span><h3 class="text-3xl font-bold mb-2"${_scopeId}>${ssrInterpolate(post.title)}</h3><div class="flex items-center gap-2 text-sm opacity-90"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-clock",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(post.readtime)} min</span></div>`);
            } else {
              return [
                createVNode("span", { class: "inline-block px-3 py-1 bg-purple-500 rounded-full text-xs font-semibold mb-3" }, toDisplayString(post.sub_category_id?.name || "Article"), 1),
                createVNode("h3", { class: "text-3xl font-bold mb-2" }, toDisplayString(post.title), 1),
                createVNode("div", { class: "flex items-center gap-2 text-sm opacity-90" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-4 h-4"
                  }),
                  createVNode("span", null, toDisplayString(post.readtime) + " min", 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><button class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-left",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</button><button class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chevron-right",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</button><div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"><!--[-->`);
      ssrRenderList(unref(trendingPosts), (_, index2) => {
        _push(`<button class="${ssrRenderClass([
          "h-2 rounded-full transition-all",
          index2 === currentSlide.value ? "bg-white w-8" : "bg-white/50 w-2"
        ])}"></button>`);
      });
      _push(`<!--]--></div></div></div><div><h2 class="text-2xl font-bold mb-6 text-gray-800 underline">Les actualités d&#39;hier</h2><div class="grid sm:grid-cols-2 gap-6"><!--[-->`);
      ssrRenderList(unref(regularPosts), (post) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: post.id,
          to: `/blog/${post.id}`,
          class: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative overflow-hidden h-48"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: post.image,
                alt: post.title,
                class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              }, null, _parent2, _scopeId));
              _push2(`<span class="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full"${_scopeId}>${ssrInterpolate(post.sub_category_id?.name || "Article")}</span></div><div class="p-5"${_scopeId}><h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors hover:underline"${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(new Date(post.created_at).toLocaleDateString("fr-FR"))}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "relative overflow-hidden h-48" }, [
                  createVNode(_component_NuxtImg, {
                    src: post.image,
                    alt: post.title,
                    class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  }, null, 8, ["src", "alt"]),
                  createVNode("span", { class: "absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full" }, toDisplayString(post.sub_category_id?.name || "Article"), 1)
                ]),
                createVNode("div", { class: "p-5" }, [
                  createVNode("h3", { class: "font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors hover:underline" }, toDisplayString(post.title), 1),
                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(new Date(post.created_at).toLocaleDateString("fr-FR")), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div><div class="space-y-6"><div class="bg-white rounded-2xl shadow-lg p-6 top-6 border border-gray-500"><div class="flex items-center gap-2 mb-6">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-newspaper",
        class: "w-6 h-6 text-indigo-600"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold text-gray-800 underline">Actualités Rénovation</h3></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(renovationNews, (news, index2) => {
        _push(`<div class="pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer"><div class="flex items-start justify-between gap-2 mb-1"><span class="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">${ssrInterpolate(news.type)}</span><span class="text-xs text-gray-400">${ssrInterpolate(news.date)}</span></div><h4 class="font-semibold text-sm text-gray-800 hover:text-purple-600 transition-colors">${ssrInterpolate(news.title)}</h4></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        class: "w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Voir toutes les actus `);
          } else {
            return [
              createTextVNode(" Voir toutes les actus ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-gray-500"><div class="flex items-center gap-2 mb-6">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "w-6 h-6 text-amber-600"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold text-gray-800 underline">Ressources Utiles</h3></div><div class="space-y-3"><!--[-->`);
      ssrRenderList(usefulLinks, (link, index2) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: index2,
          to: link.url,
          class: "flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors"${_scopeId}>${ssrInterpolate(link.title)}</span>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-top-right-on-square",
                class: "w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors" }, toDisplayString(link.title), 1),
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-top-right-on-square",
                  class: "w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white border border-gray-500"><div class="flex items-center gap-2 mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`<h3 class="text-xl font-bold underline">Newsletter</h3></div><p class="text-sm mb-4 opacity-90"> Recevez nos meilleures inspirations déco chaque semaine </p>`);
      _push(ssrRenderComponent(_component_UInput, {
        type: "email",
        placeholder: "Votre email",
        class: "mb-3 w-full",
        size: "lg"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "solid",
        class: "w-full",
        size: "lg"
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
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppListe.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AppListe" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeaderHero = __nuxt_component_0;
  const _component_AppListe = __nuxt_component_1;
  const _component_AppFooter = __nuxt_component_6;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_AppHeaderHero, null, null, _parent));
  _push(ssrRenderComponent(_component_AppListe, null, null, _parent));
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-BYYGX8Mv.mjs.map
