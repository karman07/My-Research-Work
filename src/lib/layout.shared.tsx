import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { PrintButton } from '@/components/PrintButton';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'fuma-nama',
  repo: 'fumadocs',
  branch: 'main',
};

export function baseOptions(): any {
  return {
    nav: {
      title: '3D Asset Generation System',
    },
    sidebar: {
      banner: (
        <div className="px-4 py-1">
          <PrintButton />
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
