<template>
    <div>
        <input
        :type="type"
        :class="`${variant} ${props.class}`"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        />
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

export type Type = 'textarea' | 'email' | 'number' | 'password' | 'date'

export type Variant = 'filled' | 'outlined' | 'none'


interface PropsType {
  type?: Type | ''
  value?: string
  modelValue?: string
  variant?: Variant
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  label?: string
  required: boolean
  onInput(): void,
  class: string
}

const props = defineProps({
    type: {
      default: '',
      type: String as PropType<PropsType['type']>,
      required: false,
    },
    value: {
      default: '',
      type: String as PropType<PropsType['value']>,
      required: false,
    },
    variant: {
      default: 'filled',
      type: String as PropType<PropsType['variant']>,
      required: false,
    },
    placeholder: {
      default: '',
      type: String as PropType<PropsType['placeholder']>,
      required: false,
    },
    disabled: {
      default: false,
      type: Boolean as PropType<PropsType['disabled']>,
      required: false,
    },
    readonly: {
      default: false,
      type: Boolean as PropType<PropsType['readonly']>,
      required: false,
    },
    label: {
      default: '',
      type: String as PropType<PropsType['label']>,
      required: false,
    },
    required: {
      default: false,
      type: Boolean as PropType<PropsType['required']>,
      required: false,
    },
    onInput: {
      default: () => {},
      type: Function as PropType<PropsType['onInput']>,
      required: false,
    },
    modelValue:{
      default: '',
      type: String,
      required: false,
    },
    class: {
      default: '',
      type: String as PropType<PropsType['class']>,
      required: false,
    }
  })
</script>