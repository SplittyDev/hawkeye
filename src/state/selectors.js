import { selector } from 'recoil'

export const categorySelector = selector({
  key: 'categorySelector',
  get: ({ get }) => {
    return ['Home']
  }
})
