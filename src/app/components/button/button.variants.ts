export enum VariantEnum {
  dark = 'dark',
  red = 'red',
}

export const variants = new Map<keyof typeof VariantEnum, string>()
  .set(
    'dark',
    'bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900'
  )
  .set('red', 'bg-red-700 hover:bg-red-900 focus:bg-red-900 active:bg-red-900');
