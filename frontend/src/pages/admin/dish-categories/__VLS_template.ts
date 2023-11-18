import PhotoUpload from "../../../components/PhotoUpload.vue";
import {
  __VLS_internalComponent,
  __VLS_componentsOption,
  __VLS_name,
  onSubmit,
  imageUrl,
  imageFile,
  name,
  t,
  router,
  isCreating,
} from "./AdminCreateDishCategory.vue";

function __VLS_template() {
  let __VLS_ctx!: InstanceType<
    __VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>
  > & {};
  /* Components */
  let __VLS_otherComponents!: NonNullable<
    typeof __VLS_internalComponent extends { components: infer C } ? C : {}
  > &
    typeof __VLS_componentsOption;
  let __VLS_own!: __VLS_SelfComponent<
    typeof __VLS_name,
    typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })
  >;
  let __VLS_localComponents!: typeof __VLS_otherComponents &
    Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
  let __VLS_components!: typeof __VLS_localComponents &
    __VLS_GlobalComponents &
    typeof __VLS_ctx;
  /* Style Scoped */
  type __VLS_StyleScopedClasses = {};
  let __VLS_styleScopedClasses!:
    | __VLS_StyleScopedClasses
    | keyof __VLS_StyleScopedClasses
    | (keyof __VLS_StyleScopedClasses)[];
  /* CSS variable injection */
  /* CSS variable injection end */
  let __VLS_resolvedLocalAndGlobalComponents!: {} & __VLS_WithComponent<
    "QForm",
    typeof __VLS_localComponents,
    "QForm",
    "qForm",
    "q-form"
  > &
    __VLS_WithComponent<
      "QCard",
      typeof __VLS_localComponents,
      "QCard",
      "qCard",
      "q-card"
    > &
    __VLS_WithComponent<
      "QCardSection",
      typeof __VLS_localComponents,
      "QCardSection",
      "qCardSection",
      "q-card-section"
    > &
    __VLS_WithComponent<
      "PhotoUpload",
      typeof __VLS_localComponents,
      "PhotoUpload",
      "photoUpload",
      "photo-upload"
    > &
    __VLS_WithComponent<
      "QInput",
      typeof __VLS_localComponents,
      "QInput",
      "qInput",
      "q-input"
    > &
    __VLS_WithComponent<
      "QBtn",
      typeof __VLS_localComponents,
      "QBtn",
      "qBtn",
      "q-btn"
    >;
  __VLS_components.QForm;
  __VLS_components.QForm;
  __VLS_components.qForm;
  __VLS_components.qForm;
  __VLS_components["q-form"];
  __VLS_components["q-form"];
  // @ts-ignore
  [QForm, QForm];
  __VLS_components.QCard;
  __VLS_components.QCard;
  __VLS_components.qCard;
  __VLS_components.qCard;
  __VLS_components["q-card"];
  __VLS_components["q-card"];
  // @ts-ignore
  [QCard, QCard];
  __VLS_components.QCardSection;
  __VLS_components.QCardSection;
  __VLS_components.qCardSection;
  __VLS_components.qCardSection;
  __VLS_components["q-card-section"];
  __VLS_components["q-card-section"];
  // @ts-ignore
  [QCardSection, QCardSection];
  __VLS_components.PhotoUpload;
  __VLS_components.PhotoUpload;
  __VLS_components.photoUpload;
  __VLS_components.photoUpload;
  __VLS_components["photo-upload"];
  __VLS_components["photo-upload"];
  // @ts-ignore
  [PhotoUpload, PhotoUpload];
  __VLS_components.QInput;
  __VLS_components.qInput;
  __VLS_components["q-input"];
  // @ts-ignore
  [QInput];
  __VLS_intrinsicElements.div;
  __VLS_intrinsicElements.div;
  __VLS_components.QBtn;
  __VLS_components.QBtn;
  __VLS_components.qBtn;
  __VLS_components.qBtn;
  __VLS_components["q-btn"];
  __VLS_components["q-btn"];
  // @ts-ignore
  [QBtn, QBtn];
  {
    let __VLS_0!: "QForm" extends keyof typeof __VLS_ctx
      ? typeof __VLS_ctx.QForm
      : "qForm" extends keyof typeof __VLS_ctx
      ? typeof __VLS_ctx.qForm
      : "q-form" extends keyof typeof __VLS_ctx
      ? (typeof __VLS_ctx)["q-form"]
      : (typeof __VLS_resolvedLocalAndGlobalComponents)["QForm"];
    const __VLS_1 = __VLS_asFunctionalComponent(
      __VLS_0,
      new __VLS_0({
        ...{ onSubmit: {} as any },
        class: "q-gutter-md max-w-sm q-mx-auto",
      })
    );
    (({}) as { QForm: typeof __VLS_0 }).QForm;
    (({}) as { QForm: typeof __VLS_0 }).QForm;
    const __VLS_2 = __VLS_1(
      { ...{ onSubmit: {} as any }, class: "q-gutter-md max-w-sm q-mx-auto" },
      ...__VLS_functionalComponentArgsRest(__VLS_1)
    );
    (
      ({}) as (
        props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> &
          Record<string, unknown>
      ) => void
    )({ ...{ onSubmit: {} as any }, class: "q-gutter-md max-w-sm q-mx-auto" });
    const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
    let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
    let __VLS_5 = {
      submit: __VLS_pickEvent(
        __VLS_4["submit"],
        ({} as __VLS_FunctionalComponentProps<typeof __VLS_1, typeof __VLS_2>)
          .onSubmit
      ),
    };
    __VLS_5 = { submit: __VLS_ctx.onSubmit };
    {
      let __VLS_6!: "QCard" extends keyof typeof __VLS_ctx
        ? typeof __VLS_ctx.QCard
        : "qCard" extends keyof typeof __VLS_ctx
        ? typeof __VLS_ctx.qCard
        : "q-card" extends keyof typeof __VLS_ctx
        ? (typeof __VLS_ctx)["q-card"]
        : (typeof __VLS_resolvedLocalAndGlobalComponents)["QCard"];
      const __VLS_7 = __VLS_asFunctionalComponent(
        __VLS_6,
        new __VLS_6({ ...{}, class: "q-pa-md" })
      );
      (({}) as { QCard: typeof __VLS_6 }).QCard;
      (({}) as { QCard: typeof __VLS_6 }).QCard;
      const __VLS_8 = __VLS_7(
        { ...{}, class: "q-pa-md" },
        ...__VLS_functionalComponentArgsRest(__VLS_7)
      );
      (
        ({}) as (
          props: __VLS_FunctionalComponentProps<
            typeof __VLS_6,
            typeof __VLS_8
          > &
            Record<string, unknown>
        ) => void
      )({ ...{}, class: "q-pa-md" });
      const __VLS_9 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8)!;
      let __VLS_10!: __VLS_NormalizeEmits<typeof __VLS_9.emit>;
      {
        let __VLS_11!: "QCardSection" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.QCardSection
          : "qCardSection" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.qCardSection
          : "q-card-section" extends keyof typeof __VLS_ctx
          ? (typeof __VLS_ctx)["q-card-section"]
          : (typeof __VLS_resolvedLocalAndGlobalComponents)["QCardSection"];
        const __VLS_12 = __VLS_asFunctionalComponent(
          __VLS_11,
          new __VLS_11({ ...{} })
        );
        (({}) as { QCardSection: typeof __VLS_11 }).QCardSection;
        (({}) as { QCardSection: typeof __VLS_11 }).QCardSection;
        const __VLS_13 = __VLS_12(
          { ...{} },
          ...__VLS_functionalComponentArgsRest(__VLS_12)
        );
        (
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_11,
              typeof __VLS_13
            > &
              Record<string, unknown>
          ) => void
        )({ ...{} });
        const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13)!;
        let __VLS_15!: __VLS_NormalizeEmits<typeof __VLS_14.emit>;
        {
          let __VLS_16!: "PhotoUpload" extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.PhotoUpload
            : "photoUpload" extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.photoUpload
            : "photo-upload" extends keyof typeof __VLS_ctx
            ? (typeof __VLS_ctx)["photo-upload"]
            : (typeof __VLS_resolvedLocalAndGlobalComponents)["PhotoUpload"];
          const __VLS_17 = __VLS_asFunctionalComponent(
            __VLS_16,
            new __VLS_16({
              ...{},
              url: __VLS_ctx.imageUrl,
              file: __VLS_ctx.imageFile,
            })
          );
          (({}) as { PhotoUpload: typeof __VLS_16 }).PhotoUpload;
          (({}) as { PhotoUpload: typeof __VLS_16 }).PhotoUpload;
          const __VLS_18 = __VLS_17(
            { ...{}, url: __VLS_ctx.imageUrl, file: __VLS_ctx.imageFile },
            ...__VLS_functionalComponentArgsRest(__VLS_17)
          );
          (
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_16,
                typeof __VLS_18
              > &
                Record<string, unknown>
            ) => void
          )({ ...{}, url: __VLS_ctx.imageUrl, file: __VLS_ctx.imageFile });
          const __VLS_19 = __VLS_pickFunctionalComponentCtx(
            __VLS_16,
            __VLS_18
          )!;
          let __VLS_20!: __VLS_NormalizeEmits<typeof __VLS_19.emit>;
        }
        {
          let __VLS_21!: "QInput" extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.QInput
            : "qInput" extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.qInput
            : "q-input" extends keyof typeof __VLS_ctx
            ? (typeof __VLS_ctx)["q-input"]
            : (typeof __VLS_resolvedLocalAndGlobalComponents)["QInput"];
          const __VLS_22 = __VLS_asFunctionalComponent(
            __VLS_21,
            new __VLS_21({
              ...{},
              modelValue: __VLS_ctx.name,
              label: `${__VLS_ctx.t.categoryNameLabel} *`,
              lazyRules: true,
              type: "text",
              rules: [__VLS_ctx.getDishCategoryNameRules],
            })
          );
          (({}) as { QInput: typeof __VLS_21 }).QInput;
          const __VLS_23 = __VLS_22(
            {
              ...{},
              modelValue: __VLS_ctx.name,
              label: `${__VLS_ctx.t.categoryNameLabel} *`,
              lazyRules: true,
              type: "text",
              rules: [__VLS_ctx.getDishCategoryNameRules],
            },
            ...__VLS_functionalComponentArgsRest(__VLS_22)
          );
          (
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_21,
                typeof __VLS_23
              > &
                Record<string, unknown>
            ) => void
          )({
            ...{},
            modelValue: __VLS_ctx.name,
            label: `${__VLS_ctx.t.categoryNameLabel} *`,
            lazyRules: true,
            type: "text",
            rules: [__VLS_ctx.getDishCategoryNameRules],
          });
          const __VLS_24 = __VLS_pickFunctionalComponentCtx(
            __VLS_21,
            __VLS_23
          )!;
          let __VLS_25!: __VLS_NormalizeEmits<typeof __VLS_24.emit>;
        }
        __VLS_14.slots!.default;
      }
      __VLS_9.slots!.default;
    }
    {
      const __VLS_26 = __VLS_intrinsicElements["div"];
      const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
      const __VLS_28 = __VLS_27(
        { ...{}, class: "row justify-end q-gutter-sm" },
        ...__VLS_functionalComponentArgsRest(__VLS_27)
      );
      (
        ({}) as (
          props: __VLS_FunctionalComponentProps<
            typeof __VLS_26,
            typeof __VLS_28
          > &
            Record<string, unknown>
        ) => void
      )({ ...{}, class: "row justify-end q-gutter-sm" });
      const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
      let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
      {
        let __VLS_31!: "QBtn" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.QBtn
          : "qBtn" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.qBtn
          : "q-btn" extends keyof typeof __VLS_ctx
          ? (typeof __VLS_ctx)["q-btn"]
          : (typeof __VLS_resolvedLocalAndGlobalComponents)["QBtn"];
        const __VLS_32 = __VLS_asFunctionalComponent(
          __VLS_31,
          new __VLS_31({
            ...{ onClick: {} as any },
            label: __VLS_ctx.t.cancel,
            color: "dark",
            flat: true,
          })
        );
        (({}) as { QBtn: typeof __VLS_31 }).QBtn;
        const __VLS_33 = __VLS_32(
          {
            ...{ onClick: {} as any },
            label: __VLS_ctx.t.cancel,
            color: "dark",
            flat: true,
          },
          ...__VLS_functionalComponentArgsRest(__VLS_32)
        );
        (
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_31,
              typeof __VLS_33
            > &
              Record<string, unknown>
          ) => void
        )({
          ...{ onClick: {} as any },
          label: __VLS_ctx.t.cancel,
          color: "dark",
          flat: true,
        });
        const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
        let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
        let __VLS_36 = {
          click: __VLS_pickEvent(
            __VLS_35["click"],
            (
              {} as __VLS_FunctionalComponentProps<
                typeof __VLS_32,
                typeof __VLS_33
              >
            ).onClick
          ),
        };
        __VLS_36 = { click: () => __VLS_ctx.router.back() };
      }
      {
        let __VLS_37!: "QBtn" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.QBtn
          : "qBtn" extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.qBtn
          : "q-btn" extends keyof typeof __VLS_ctx
          ? (typeof __VLS_ctx)["q-btn"]
          : (typeof __VLS_resolvedLocalAndGlobalComponents)["QBtn"];
        const __VLS_38 = __VLS_asFunctionalComponent(
          __VLS_37,
          new __VLS_37({
            ...{},
            label: __VLS_ctx.t.save,
            loading: __VLS_ctx.isCreating,
            type: "submit",
            color: "primary",
          })
        );
        (({}) as { QBtn: typeof __VLS_37 }).QBtn;
        const __VLS_39 = __VLS_38(
          {
            ...{},
            label: __VLS_ctx.t.save,
            loading: __VLS_ctx.isCreating,
            type: "submit",
            color: "primary",
          },
          ...__VLS_functionalComponentArgsRest(__VLS_38)
        );
        (
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_37,
              typeof __VLS_39
            > &
              Record<string, unknown>
          ) => void
        )({
          ...{},
          label: __VLS_ctx.t.save,
          loading: __VLS_ctx.isCreating,
          type: "submit",
          color: "primary",
        });
        const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39)!;
        let __VLS_41!: __VLS_NormalizeEmits<typeof __VLS_40.emit>;
      }
      __VLS_29.slots!.default;
    }
    __VLS_3.slots!.default;
  }
  if (
    typeof __VLS_styleScopedClasses === "object" &&
    !Array.isArray(__VLS_styleScopedClasses)
  ) {
  }
  var __VLS_slots!: {};
  // @ts-ignore
  [
    onSubmit,
    imageUrl,
    imageFile,
    imageUrl,
    imageFile,
    imageUrl,
    imageFile,
    name,
    t,
    getDishCategoryNameRules,
    name,
    t,
    getDishCategoryNameRules,
    name,
    t,
    getDishCategoryNameRules,
    t,
    t,
    t,
    router,
    t,
    isCreating,
    t,
    isCreating,
    t,
    isCreating,
  ];
  return __VLS_slots;
}
