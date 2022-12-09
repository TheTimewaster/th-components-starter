import { unref, type Ref } from 'vue';

export default (element?: Ref<HTMLElement>, smooth: boolean = true) => {
  const scrollToTop = () => {
    if (element == null || element.value == null) {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    } else {
      unref(element).scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  return scrollToTop;
};
