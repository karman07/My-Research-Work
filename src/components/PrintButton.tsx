'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 mt-2 rounded-lg text-sm font-semibold transition-all border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 shadow-sm"
            title="Download as PDF"
            style={{ color: 'var(--heading-maroon)' }}
        >
            <Printer className="w-4 h-4" />
            <span>Download PDF</span>
        </button>
    );
}
