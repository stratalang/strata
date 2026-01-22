import { inject } from '@vercel/analytics';
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './branding.css'

export default {
    ...DefaultTheme,
    setup() {
        inject();

        const route = useRoute();

        const setupTabs = () => {
             const tabs = document.querySelectorAll('.build-tab');
             const contents = document.querySelectorAll('.build-code-content');

             if (tabs.length === 0) return;

             tabs.forEach(tab => {
                 tab.addEventListener('click', () => {
                     const targetTab = tab.dataset.tab;

                     tabs.forEach(t => t.classList.remove('active'));
                     tab.classList.add('active');

                     contents.forEach(c => {
                         if (c.dataset.content === targetTab) {
                             c.classList.add('active');
                         } else {
                             c.classList.remove('active');
                         }
                     });
                 });
             });
        };

        onMounted(() => {
            setupTabs();

            watch(
              () => route.path,
              () => nextTick(() => setupTabs())
            );
        });
    }
};
