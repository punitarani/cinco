import './globals.css';
import { Inter } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Cinco - Medical Insurance Claims Copilot',
    description: 'Medical insurance claims co-pilot for triage, meetings, and appeals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="p-4">
                        <div className="mb-4">
                            <SidebarTrigger />
                        </div>
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
