<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";
import { locales } from "~/constants";

interface IProps {
  name: string;
}

const { name } = defineProps<IProps>();

const { remove, push, fields } = useFieldArray<Object>(name);

const handleRemove = (index: number): void => remove(index);
const handleAdd = (): void => push({ key: "", value_en: "", value_ru: "" });
</script>

<template>
  <el-col v-for="(_, i) in fields" class="mb-4 border-b">
    <el-row :gutter="24">
      <el-col :span="22">
        <el-row :gutter="24" v-for="{ id } in locales" :key="id">
          <el-col :md="12">
            <form-input
              :name="`${name}[${i}].key_${id}`"
              :label="`${$t('common_schema.key')} (${$t(`lang.${id}`)})`"
            />
          </el-col>

          <el-col :md="12">
            <form-input
              :name="`${name}[${i}].value_${id}`"
              :label="`${$t('common_schema.value')} (${$t(`lang.${id}`)})`"
            />
          </el-col>
        </el-row>
      </el-col>

      <el-col v-if="fields.length > 1" :span="2">
        <div class="flex w-full h-full items-center">
          <div
            @click="handleRemove(i)"
            class="rounded-lg bg-cwhite flex justify-center items-center w-[30px] h-[30px] cursor-pointer"
          >
            <i-base-delete filled />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-col>

  <el-col>
    <div
      @click="handleAdd"
      class="rounded-lg bg-cwhite flex justify-center items-center w-[30px] h-[30px] cursor-pointer"
    >
      <i-base-add class="text-green-400" />
    </div>

    <br />
    <br />
  </el-col>
</template>
