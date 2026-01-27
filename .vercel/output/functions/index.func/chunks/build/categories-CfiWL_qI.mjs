import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, reactive, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './Skeleton-BkyI3x_m.mjs';
import { _ as _export_sfc, g as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$4 } from './Table--TBdXpC7.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategorieTable",
  __ssrInlineRender: true,
  setup(__props) {
    const USkeleton = _sfc_main$3;
    const UButton = _sfc_main$8;
    const UIcon = _sfc_main$e;
    const categories = ref([]);
    const loading = ref(true);
    ref("");
    const deleteCategory = async (id) => {
      if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
      loading.value = true;
      try {
        await $fetch(`/api/categories/${id}`, { method: "DELETE" });
        categories.value = categories.value.filter((c) => c.id !== id);
      } catch (err) {
        console.error("Erreur suppression:", err);
        alert("Impossible de supprimer la catégorie.");
      } finally {
        loading.value = false;
      }
    };
    const columns = [
      {
        accessorKey: "name",
        header: "Catégorie",
        cell: ({ row }) => {
          const name = row.getValue("name");
          const { icon, color, description } = row.original;
          return h("div", { class: "flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h("div", {
              class: "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
              style: { backgroundColor: color + "20" }
            }, [
              h(_sfc_main$e, {
                name: icon,
                class: "w-6 h-6",
                style: { color }
              })
            ]),
            h("div", { class: "flex flex-col flex-1" }, [
              h("span", { class: "font-semibold text-gray-900 dark:text-gray-100" }, name),
              h("span", { class: "text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs" }, description)
            ])
          ]);
        }
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => {
          const slug = row.getValue("slug");
          return h("div", { class: "flex items-center gap-2 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h(
              "code",
              { class: "px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-indigo-400 rounded border border-gray-200 dark:border-gray-700" },
              "/" + slug
            )
          ]);
        }
      },
      {
        accessorKey: "articlesCount",
        header: "Articles",
        cell: ({ row }) => {
          const count = row.getValue("articlesCount") || 0;
          return h("div", { class: "flex items-center gap-2 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h("div", {
              class: "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30"
            }, [
              h("span", { class: "text-sm font-bold text-purple-700 dark:text-indigo-400" }, count)
            ])
          ]);
        }
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
          const status = row.getValue("status");
          const isActive = status === "Active";
          return h("div", { class: "flex items-center gap-2 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h("div", {
              class: `w-2 h-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`
            }),
            h("span", {
              class: `text-sm font-medium ${isActive ? "text-emerald-700 dark:text-emerald-400" : "text-gray-600 dark:text-gray-400"}`
            }, isActive ? "Active" : "Inactive")
          ]);
        }
      },
      {
        accessorKey: "createdAt",
        header: "Créée le",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));
          return h("div", { class: "flex flex-col px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h(
              "span",
              { class: "text-sm font-medium text-gray-700 dark:text-gray-300" },
              date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
            ),
            h(
              "span",
              { class: "text-xs text-gray-500 dark:text-gray-400" },
              date.toLocaleDateString("fr-FR", { year: "numeric" })
            )
          ]);
        }
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return h("div", { class: "flex items-center gap-1 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h(_sfc_main$8, {
              icon: "i-heroicons-eye",
              variant: "ghost",
              color: "gray",
              square: true,
              size: "sm",
              class: "!text-blue-600 dark:!text-blue-400 hover:!bg-blue-100/50 dark:hover:!bg-blue-900/30",
              title: "Voir les articles"
            }),
            h(_sfc_main$8, {
              icon: "i-heroicons-pencil-square",
              variant: "ghost",
              color: "gray",
              square: true,
              size: "sm",
              class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30",
              title: "Modifier"
            }),
            h(_sfc_main$8, {
              icon: "i-heroicons-trash",
              variant: "ghost",
              color: "gray",
              square: true,
              size: "sm",
              class: "!text-red-500 dark:!text-red-400 hover:!bg-red-100/50 dark:hover:!bg-red-900/30",
              title: "Supprimer",
              onClick: () => deleteCategory(row.original.id)
            })
          ]);
        }
      }
    ];
    const stats = computed(() => [
      {
        label: "Catégories actives",
        value: categories.value.filter((c) => c.status === "Active").length,
        icon: "i-heroicons-check-circle",
        trend: "+2",
        trendUp: true
      },
      {
        label: "Catégories inactives",
        value: categories.value.filter((c) => c.status === "Inactive").length,
        icon: "i-heroicons-no-symbol",
        trend: "0",
        trendUp: false
      },
      {
        label: "Total d'articles",
        value: categories.value.reduce((sum, c) => sum + (c.articlesCount || 0), 0).toLocaleString(),
        icon: "i-heroicons-document-text",
        trend: "+15%",
        trendUp: true
      },
      {
        label: "Total catégories",
        value: categories.value.length,
        icon: "i-heroicons-tag",
        trend: "+1",
        trendUp: true
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTable = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 overflow-y-auto" }, _attrs))} data-v-e577f7f8><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-v-e577f7f8>`);
      if (!loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(stats.value, (stat, index) => {
          _push(`<div class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 p-6 hover:border-purple-300/60 dark:hover:border-indigo-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10" data-v-e577f7f8><div class="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-e577f7f8></div><div class="relative flex items-start justify-between" data-v-e577f7f8><div class="flex-1" data-v-e577f7f8><p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" data-v-e577f7f8>${ssrInterpolate(stat.label)}</p><p class="text-3xl font-bold text-gray-900 dark:text-gray-100" data-v-e577f7f8>${ssrInterpolate(stat.value)}</p><div class="flex items-center gap-1 mt-2" data-v-e577f7f8>`);
          _push(ssrRenderComponent(unref(UIcon), {
            name: stat.trendUp ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
            class: [stat.trendUp ? "text-emerald-500" : "text-amber-500", "w-4 h-4"]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([stat.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400", "text-sm font-semibold"])}" data-v-e577f7f8>${ssrInterpolate(stat.trend)}</span></div></div><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" data-v-e577f7f8>`);
          _push(ssrRenderComponent(unref(UIcon), {
            name: stat.icon,
            class: "w-6 h-6 text-purple-600 dark:text-indigo-400"
          }, null, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 p-6" data-v-e577f7f8>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-24 mb-3 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-16 mb-3 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-16 rounded" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 overflow-hidden shadow-sm" data-v-e577f7f8><div class="px-6 py-4 border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-purple-950/20 dark:to-indigo-950/20" data-v-e577f7f8><div class="flex items-center justify-between" data-v-e577f7f8><div class="flex items-center gap-3" data-v-e577f7f8><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30" data-v-e577f7f8>`);
      _push(ssrRenderComponent(unref(UIcon), {
        name: "i-heroicons-tag",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div data-v-e577f7f8><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100" data-v-e577f7f8>Liste des catégories</h3><p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5" data-v-e577f7f8>Gérez et organisez vos catégories d&#39;articles</p></div></div><div class="flex items-center gap-2" data-v-e577f7f8>`);
      _push(ssrRenderComponent(unref(UButton), {
        icon: "i-heroicons-funnel",
        variant: "ghost",
        color: "gray",
        square: "",
        class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30",
        title: "Filtrer"
      }, null, _parent));
      _push(ssrRenderComponent(unref(UButton), {
        icon: "i-heroicons-arrows-up-down",
        variant: "ghost",
        color: "gray",
        square: "",
        class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30",
        title: "Trier"
      }, null, _parent));
      _push(ssrRenderComponent(unref(UButton), {
        icon: "i-heroicons-arrow-path",
        variant: "ghost",
        color: "gray",
        square: "",
        class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30",
        title: "Actualiser",
        onClick: ($event) => {
          loading.value = true;
          _ctx.setTimeout(() => loading.value = false, 1e3);
        }
      }, null, _parent));
      _push(`</div></div></div><div class="p-6 max-h-[500px] overflow-y-auto" data-v-e577f7f8>`);
      if (loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800/50" data-v-e577f7f8>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-12 w-12 rounded-xl" }, null, _parent));
          _push(`<div class="flex-1 space-y-2" data-v-e577f7f8>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-3/4 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-3 w-1/2 rounded" }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-20 rounded-full" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-16 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-24 rounded" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_UTable, {
          data: categories.value,
          columns,
          class: "min-w-full"
        }, null, _parent));
      }
      _push(`</div>`);
      if (!loading.value && categories.value.length > 0) {
        _push(`<div class="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50" data-v-e577f7f8><div class="flex items-center justify-between" data-v-e577f7f8><p class="text-sm text-gray-600 dark:text-gray-400" data-v-e577f7f8> Affichage de <span class="font-semibold text-gray-900 dark:text-gray-100" data-v-e577f7f8>${ssrInterpolate(categories.value.length)}</span> catégories </p><div class="flex items-center gap-2" data-v-e577f7f8>`);
        _push(ssrRenderComponent(unref(UButton), {
          icon: "i-heroicons-chevron-left",
          variant: "ghost",
          color: "gray",
          size: "sm",
          disabled: ""
        }, null, _parent));
        _push(`<div class="flex items-center gap-1" data-v-e577f7f8>`);
        _push(ssrRenderComponent(unref(UButton), {
          variant: "solid",
          color: "primary",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`1`);
            } else {
              return [
                createTextVNode("1")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(UButton), {
          variant: "ghost",
          color: "gray",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`2`);
            } else {
              return [
                createTextVNode("2")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(UButton), {
          variant: "ghost",
          color: "gray",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`3`);
            } else {
              return [
                createTextVNode("3")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(unref(UButton), {
          icon: "i-heroicons-chevron-right",
          variant: "ghost",
          color: "gray",
          size: "sm"
        }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && categories.value.length === 0) {
        _push(`<div class="p-12 text-center" data-v-e577f7f8><div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center" data-v-e577f7f8>`);
        _push(ssrRenderComponent(unref(UIcon), {
          name: "i-heroicons-tag",
          class: "w-10 h-10 text-purple-600 dark:text-indigo-400"
        }, null, _parent));
        _push(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2" data-v-e577f7f8>Aucune catégorie</h3><p class="text-sm text-gray-600 dark:text-gray-400 mb-6" data-v-e577f7f8>Créez votre première catégorie pour commencer à organiser vos articles</p>`);
        _push(ssrRenderComponent(unref(UButton), {
          color: "primary",
          icon: "i-heroicons-plus"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Créer une catégorie `);
            } else {
              return [
                createTextVNode(" Créer une catégorie ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/CategorieTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CategorieTable = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-e577f7f8"]]), { __name: "CategorieTable" });
const nameMaxLength = 50;
const descriptionMaxLength = 200;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreateCategoriesModal",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const form = reactive({
      name: "",
      slug: "",
      description: "",
      icon: "",
      color: "#9333EA",
      // Purple par défaut
      parentCategory: ""
    });
    const availableIcons = [
      { value: "i-heroicons-home", label: "Maison", preview: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { value: "i-heroicons-sparkles", label: "Luxe", preview: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
      { value: "i-heroicons-building-office", label: "Architecture", preview: "M3 21h18M3 7v1a3 3 0 003 3h12a3 3 0 003-3V7m-18 0V5a3 3 0 013-3h12a3 3 0 013 3v2M3 7h18M13 11h.01M9 11h.01M13 15h.01M9 15h.01M13 19h.01M9 19h.01" },
      { value: "i-heroicons-light-bulb", label: "Inspiration", preview: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
      { value: "i-heroicons-paint-brush", label: "Décoration", preview: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" },
      { value: "i-heroicons-scissors", label: "Rénovation", preview: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
      { value: "i-heroicons-photo", label: "Galerie", preview: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { value: "i-heroicons-heart", label: "Lifestyle", preview: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
    ];
    const availableColors = [
      { value: "#9333EA", label: "Purple" },
      { value: "#6366F1", label: "Indigo" },
      { value: "#EC4899", label: "Pink" },
      { value: "#F59E0B", label: "Amber" },
      { value: "#10B981", label: "Emerald" },
      { value: "#3B82F6", label: "Blue" },
      { value: "#EF4444", label: "Red" },
      { value: "#6B7280", label: "Gray" }
    ];
    const parentCategories = ref([]);
    const isFormValid = computed(() => {
      return form.name && form.slug && form.description && form.icon && form.color;
    });
    ref(false);
    ref(null);
    Object.assign(form, {
      name: "",
      slug: "",
      description: "",
      icon: "",
      color: "#9333EA",
      parentCategory: ""
    });
    isOpen.value = false;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="ml-auto inline-flex items-center gap-2 px-4 py-2 m-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold max-w-[220px] rounded-xl shadow-md float-right shadow-purple-500/40 hover:shadow-md hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg> Nouvelle catégorie </button>`);
      if (isOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200/60 dark:border-gray-800 animate-in fade-in zoom-in duration-300"><div class="px-6 py-5 border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-purple-950/20 dark:to-indigo-950/20 rounded-t-2xl"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30"><svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg></div><div><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Créer une catégorie</h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Organisez vos articles par thématique</p></div></div><button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div class="p-6 space-y-6 overflow-y-auto flex-1"><div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Nom de la catégorie <span class="text-red-500">*</span></label><span class="text-xs text-gray-400">${ssrInterpolate(form.name.length)}/${ssrInterpolate(nameMaxLength)}</span></div><input type="text"${ssrRenderAttr("value", form.name)}${ssrRenderAttr("maxlength", nameMaxLength)} placeholder="Ex: Architecture moderne, Décoration intérieure..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all"></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Slug (URL) <span class="text-red-500">*</span></label><div class="flex items-center gap-2"><span class="text-sm text-gray-500 dark:text-gray-400">/categories/</span><input type="text"${ssrRenderAttr("value", form.slug)} placeholder="architecture-moderne" class="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all"></div><p class="text-xs text-gray-500 dark:text-gray-400">Le slug est généré automatiquement depuis le nom</p></div><div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Description <span class="text-red-500">*</span></label><span class="text-xs text-gray-400">${ssrInterpolate(form.description.length)}/${ssrInterpolate(descriptionMaxLength)}</span></div><textarea${ssrRenderAttr("maxlength", descriptionMaxLength)} placeholder="Décrivez cette catégorie et son contenu..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all resize-none" rows="3">${ssrInterpolate(form.description)}</textarea></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Icône <span class="text-red-500">*</span></label><div class="grid grid-cols-4 md:grid-cols-4 gap-3"><!--[-->`);
        ssrRenderList(availableIcons, (icon) => {
          _push(`<button class="${ssrRenderClass([
            "group relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
            form.icon === icon.value ? "border-purple-600 dark:border-indigo-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30" : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-900"
          ])}"${ssrRenderAttr("title", icon.label)}><svg class="${ssrRenderClass([form.icon === icon.value ? "text-purple-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-purple-500 dark:group-hover:text-indigo-400", "w-6 h-6 transition-colors"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", icon.preview)}></path></svg><span class="${ssrRenderClass(["text-xs font-medium", form.icon === icon.value ? "text-purple-700 dark:text-indigo-300" : "text-gray-600 dark:text-gray-400"])}">${ssrInterpolate(icon.label)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Couleur <span class="text-red-500">*</span></label><div class="grid grid-cols-4 md:grid-cols-8 gap-3"><!--[-->`);
        ssrRenderList(availableColors, (color) => {
          _push(`<button class="${ssrRenderClass([
            "group relative w-full aspect-square rounded-xl transition-all duration-200 border-2",
            form.color === color.value ? "border-gray-900 dark:border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"
          ])}" style="${ssrRenderStyle({ backgroundColor: color.value })}"${ssrRenderAttr("title", color.label)}>`);
          if (form.color === color.value) {
            _push(`<svg class="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Catégorie parente (optionnel) </label><select class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all"><!--[-->`);
        ssrRenderList(parentCategories.value, (parent) => {
          _push(`<option${ssrRenderAttr("value", parent.value)}${ssrIncludeBooleanAttr(Array.isArray(form.parentCategory) ? ssrLooseContain(form.parentCategory, parent.value) : ssrLooseEqual(form.parentCategory, parent.value)) ? " selected" : ""}>${ssrInterpolate(parent.label)}</option>`);
        });
        _push(`<!--]--></select><p class="text-xs text-gray-500 dark:text-gray-400">Créez une hiérarchie en assignant une catégorie parente</p></div><div class="p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/50 dark:border-indigo-800/50"><p class="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">Aperçu de la catégorie :</p><div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2" style="${ssrRenderStyle({ borderColor: form.color, backgroundColor: form.color + "10" })}">`);
        if (form.icon) {
          _push(`<svg class="w-5 h-5" style="${ssrRenderStyle({ color: form.color })}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", availableIcons.find((i) => i.value === form.icon)?.preview || "")}></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="font-semibold" style="${ssrRenderStyle({ color: form.color })}">${ssrInterpolate(form.name || "Nom de la catégorie")}</span></div></div></div><div class="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-2xl flex items-center justify-between"><p class="text-xs text-gray-500 dark:text-gray-400"><span class="text-red-500">*</span> Champs obligatoires </p><div class="flex gap-3"><button class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"> Annuler </button><button${ssrIncludeBooleanAttr(!isFormValid.value) ? " disabled" : ""} class="${ssrRenderClass(["inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:via-indigo-600 disabled:hover:to-purple-700"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Créer la catégorie </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/CreateCategoriesModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CreateCategoriesModal = Object.assign(_sfc_main$1, { __name: "CreateCategoriesModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(CategorieTable, null, null, _parent));
      _push(ssrRenderComponent(CreateCategoriesModal, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-CfiWL_qI.mjs.map
