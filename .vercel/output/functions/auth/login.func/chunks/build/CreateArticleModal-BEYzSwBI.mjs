import { _ as _sfc_main$3 } from './Table--TBdXpC7.mjs';
import { _ as _sfc_main$2 } from './Skeleton-BkyI3x_m.mjs';
import { _ as _export_sfc, g as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, reactive, watch, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleTable",
  __ssrInlineRender: true,
  setup(__props) {
    const UTable = _sfc_main$3;
    const USkeleton = _sfc_main$2;
    const UButton = _sfc_main$8;
    const UIcon = _sfc_main$e;
    const articles = ref([]);
    const loading = ref(true);
    const error = ref("");
    const fetchPosts = async () => {
      loading.value = true;
      error.value = "";
      try {
        const data = await $fetch("/api/posts");
        articles.value = data.map((post) => ({
          id: post.id,
          title: post.title,
          category: post.subCategory || "Sans catégorie",
          date: post.createdAt,
          // Prisma renvoie camelCase
          status: "Publié",
          views: 0
        }));
      } catch (err) {
        console.error("Erreur API interne:", err);
        error.value = "Impossible de récupérer les articles.";
        articles.value = [];
      } finally {
        loading.value = false;
      }
    };
    fetchPosts();
    async function deleteArticle(id) {
      try {
        const confirmed = confirm("Voulez-vous vraiment supprimer cet article ?");
        if (!confirmed) return;
        const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression de l’article");
        articles.value = articles.value.filter((a) => a.id !== id);
        alert("Article supprimé avec succès ✅");
      } catch (error2) {
        console.error(error2);
        alert("Impossible de supprimer l’article ❌");
      }
    }
    const isModalOpen = ref(false);
    const articleToEdit = ref(null);
    const columns = [
      {
        accessorKey: "title",
        header: "Titre",
        cell: ({ row }) => {
          const title = row.getValue("title");
          return h("div", { class: "flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h("div", { class: "w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center" }, [
              h(_sfc_main$e, { name: "i-heroicons-document-text", class: "w-5 h-5 text-purple-600 dark:text-indigo-400" })
            ]),
            h("div", { class: "flex flex-col" }, [
              h("span", { class: "font-semibold text-gray-900 dark:text-gray-100" }, title),
              h("span", { class: "text-xs text-gray-500 dark:text-gray-400" }, row.original.category)
            ])
          ]);
        }
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
          const status = row.getValue("status");
          const isPublished = status === "Publié";
          return h("div", { class: "flex items-center gap-2 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h("div", {
              class: `w-2 h-2 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`
            }),
            h("span", {
              class: `text-sm font-medium ${isPublished ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`
            }, status)
          ]);
        }
      },
      {
        accessorKey: "views",
        header: "Vues",
        cell: ({ row }) => {
          const views = row.getValue("views") || 0;
          return h("div", { class: "flex items-center gap-2 text-gray-600 dark:text-gray-400 px-4 py-4 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gradient-to-r hover:from-purple-50/30 hover:via-transparent hover:to-indigo-50/30 dark:hover:from-purple-950/10 dark:hover:via-transparent dark:hover:to-indigo-950/10 transition-all duration-200" }, [
            h(_sfc_main$e, { name: "i-heroicons-eye", class: "w-4 h-4" }),
            h("span", { class: "text-sm font-medium" }, views.toLocaleString())
          ]);
        }
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"));
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
          const article = row.original;
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
              onClick: () => {
                articleToEdit.value = article;
                isModalOpen.value = true;
              }
            }),
            h(_sfc_main$8, {
              icon: "i-heroicons-trash",
              variant: "ghost",
              color: "gray",
              square: true,
              size: "sm",
              class: "!text-red-500 dark:!text-red-400 hover:!bg-red-100/50 dark:hover:!bg-red-900/30",
              onClick: () => deleteArticle(article.id)
            })
          ]);
        }
      }
    ];
    const stats = computed(() => [
      {
        label: "Articles publiés",
        value: articles.value.filter((a) => a.status === "Publié").length,
        icon: "i-heroicons-check-circle",
        trend: "+12%",
        trendUp: true
      },
      {
        label: "Brouillons",
        value: articles.value.filter((a) => a.status === "Brouillon").length,
        icon: "i-heroicons-document-text",
        trend: "-3%",
        trendUp: false
      },
      {
        label: "Vues totales",
        value: articles.value.reduce((sum, a) => sum + (a.views || 0), 0).toLocaleString(),
        icon: "i-heroicons-eye",
        trend: "+24%",
        trendUp: true
      },
      {
        label: "Total",
        value: articles.value.length,
        icon: "i-heroicons-squares-2x2",
        trend: "+2",
        trendUp: true
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-h-[500px] overflow-y-auto" }, _attrs))} data-v-825de41a><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-v-825de41a>`);
      if (!loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(stats.value, (stat, index) => {
          _push(`<div class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 p-6 hover:border-purple-300/60 dark:hover:border-indigo-700/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10" data-v-825de41a><div class="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-825de41a></div><div class="relative flex items-start justify-between" data-v-825de41a><div class="flex-1" data-v-825de41a><p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1" data-v-825de41a>${ssrInterpolate(stat.label)}</p><p class="text-3xl font-bold text-gray-900 dark:text-gray-100" data-v-825de41a>${ssrInterpolate(stat.value)}</p><div class="flex items-center gap-1 mt-2" data-v-825de41a>`);
          _push(ssrRenderComponent(unref(UIcon), {
            name: stat.trendUp ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
            class: [stat.trendUp ? "text-emerald-500" : "text-amber-500", "w-4 h-4"]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([stat.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400", "text-sm font-semibold"])}" data-v-825de41a>${ssrInterpolate(stat.trend)}</span></div></div><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" data-v-825de41a>`);
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
          _push(`<div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 p-6" data-v-825de41a>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-24 mb-3 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-16 mb-3 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-16 rounded" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div data-v-825de41a><div class="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 overflow-hidden shadow-sm" data-v-825de41a><div class="px-6 py-4 border-b border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50" data-v-825de41a><div class="flex items-center justify-between" data-v-825de41a><div data-v-825de41a><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100" data-v-825de41a>Liste des articles</h3><p class="text-sm text-gray-600 dark:text-gray-400 mt-1" data-v-825de41a>Gérez et organisez vos publications</p></div><div class="flex items-center gap-2" data-v-825de41a>`);
      _push(ssrRenderComponent(unref(UButton), {
        icon: "i-heroicons-funnel",
        variant: "ghost",
        color: "gray",
        square: "",
        class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30"
      }, null, _parent));
      _push(ssrRenderComponent(unref(UButton), {
        icon: "i-heroicons-arrows-up-down",
        variant: "ghost",
        color: "gray",
        square: "",
        class: "!text-purple-600 dark:!text-indigo-400 hover:!bg-purple-100/50 dark:hover:!bg-indigo-900/30"
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
      _push(`</div></div></div><div class="p-6 max-h-[500px] overflow-y-auto" data-v-825de41a>`);
      if (loading.value) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="flex items-center gap-4 mb-4" data-v-825de41a>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-10 w-10 rounded-lg" }, null, _parent));
          _push(`<div class="flex-1 space-y-2" data-v-825de41a>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-4 w-3/4 rounded" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-3 w-1/2 rounded" }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-20 rounded-full" }, null, _parent));
          _push(ssrRenderComponent(unref(USkeleton), { class: "h-8 w-16 rounded" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(unref(UTable), {
          data: articles.value,
          columns,
          class: "min-w-full"
        }, null, _parent));
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ArticleTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-825de41a"]]), { __name: "ArticleTable" });
const currentUser = "Zaki AGOKOLI";
const titleMaxLength = 100;
const descriptionMaxLength = 250;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CreateArticleModal",
  __ssrInlineRender: true,
  props: {
    postToEdit: {}
  },
  setup(__props) {
    const isOpen = ref(false);
    const categories = ref([]);
    const form = reactive({
      category: "",
      sub_category_id: null,
      title: "",
      content: "",
      description: "",
      images: [],
      author: ""
    });
    ref(true);
    const isFormValid = computed(() => {
      return form.category && form.title && form.content && form.description;
    });
    const props = __props;
    watch(() => props.postToEdit, (newPost) => {
      if (newPost) {
        form.category = newPost.category;
        form.title = newPost.title;
        form.description = newPost.description;
        form.content = newPost.content;
        form.author = newPost.author || "";
      } else {
        Object.assign(form, { category: "", title: "", description: "", content: "", images: [], author: "" });
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button size="md" class="ml-auto inline-flex items-center gap-2 px-4 py-2 m-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold max-w-[200px] rounded-xl shadow-md float-right shadow-purple-500/40 hover:shadow-md hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Créer un article </button>`);
      if (isOpen.value) {
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200/60 dark:border-gray-800 animate-in fade-in zoom-in duration-300"><div class="px-6 py-5 border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-purple-950/20 dark:to-indigo-950/20 rounded-t-2xl"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30"><svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Créer un article</h3><p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Partagez votre contenu avec votre audience</p></div></div><button class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div class="p-6 space-y-6 overflow-y-auto flex-1"><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Catégorie <span class="text-red-500">*</span></label><div class="grid grid-cols-2 md:grid-cols-3 gap-3"><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<button class="${ssrRenderClass([
            "group relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200",
            form.category === cat.value ? "border-purple-600 dark:border-indigo-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30" : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-900"
          ])}"><svg class="${ssrRenderClass([form.category === cat.value ? "text-purple-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-purple-500 dark:group-hover:text-indigo-400", "w-5 h-5 transition-colors"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
          if (cat.value === "Tech") {
            _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>`);
          } else if (cat.value === "Lifestyle") {
            _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>`);
          } else if (cat.value === "Voyage") {
            _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`);
          } else if (cat.value === "Sport") {
            _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>`);
          } else {
            _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>`);
          }
          _push(`</svg><span class="${ssrRenderClass(["text-sm font-medium", form.category === cat.value ? "text-purple-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"])}">${ssrInterpolate(cat.label)}</span></button>`);
        });
        _push(`<!--]--></div></div><div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Titre <span class="text-red-500">*</span></label><span class="text-xs text-gray-400">${ssrInterpolate(form.title.length)}/${ssrInterpolate(titleMaxLength)}</span></div><input type="text"${ssrRenderAttr("value", form.title)}${ssrRenderAttr("maxlength", titleMaxLength)} placeholder="Donnez un titre accrocheur à votre article..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all"></div><div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Description <span class="text-red-500">*</span></label><span class="text-xs text-gray-400">${ssrInterpolate(form.description.length)}/${ssrInterpolate(descriptionMaxLength)}</span></div><textarea${ssrRenderAttr("maxlength", descriptionMaxLength)} placeholder="Résumez votre article en quelques mots..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all resize-none" rows="2">${ssrInterpolate(form.description)}</textarea></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300"> Contenu <span class="text-red-500">*</span></label><textarea placeholder="Rédigez le contenu complet de votre article..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-indigo-500 transition-all resize-none" rows="6">${ssrInterpolate(form.content)}</textarea></div><div class="space-y-2"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Images (optionnel)</label><label class="group cursor-pointer block"><div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-purple-400 dark:hover:border-indigo-600 hover:bg-purple-50/30 dark:hover:bg-indigo-950/20 transition-all duration-200"><svg class="w-10 h-10 mx-auto text-gray-400 group-hover:text-purple-500 dark:group-hover:text-indigo-400 transition-colors mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-indigo-400">Cliquez pour télécharger des images</p><p class="text-xs text-gray-400 mt-1">PNG, JPG jusqu&#39;à 10MB</p></div><input type="file" multiple accept="image/*" class="hidden"></label>`);
        if (form.images.length > 0) {
          _push(`<div class="grid grid-cols-2 gap-3 mt-3"><!--[-->`);
          ssrRenderList(form.images, (file, index) => {
            _push(`<div class="group relative flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"><svg class="w-5 h-5 text-purple-500 dark:text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">${ssrInterpolate(file.name)}</span><button class="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200/50 dark:border-indigo-800/50"><input type="checkbox"${ssrIncludeBooleanAttr(ssrLooseEqual(form.author, "self")) ? " checked" : ""} id="author-checkbox" class="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-900 cursor-pointer"><label for="author-checkbox" class="flex-1 cursor-pointer"><p class="text-sm font-medium text-gray-700 dark:text-gray-300"> Définir l&#39;auteur comme <span class="font-bold text-purple-600 dark:text-indigo-400">${ssrInterpolate(currentUser)}</span></p><p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Votre nom apparaîtra sur cet article</p></label></div></div><div class="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-b-2xl flex items-center justify-between"><p class="text-xs text-gray-500 dark:text-gray-400"><span class="text-red-500">*</span> Champs obligatoires </p><div class="flex gap-3"><button class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"> Annuler </button><button${ssrIncludeBooleanAttr(!isFormValid.value) ? " disabled" : ""} class="${ssrRenderClass(["inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:via-indigo-600 disabled:hover:to-purple-700"])}"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Créer l&#39;article </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/CreateArticleModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "CreateArticleModal" });

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=CreateArticleModal-BEYzSwBI.mjs.map
