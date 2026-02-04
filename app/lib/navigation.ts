import { 
  BookOpen, 
  Home,
  Flag,
  Stone,
  Pickaxe,
  LucideIcon // Импортируем тип для TypeScript
} from 'lucide-react';

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon; // <-- Меняем тип с string на компонент иконки
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: 'Главная',
    href: '/',
    icon: Home, // <-- Передаем как компонент (без кавычек)
  },
  {
    title: 'Первые шаги',
    href: '/pages/first-steps',
    icon: Flag, // <-- Теперь это работает сразу
  },
  {
    title: 'Ресурсы',
    icon: Stone,
    children: [
      { title: 'Камень', href: '/pages/materials/rock' },
      { title: 'Палки', href: '/pages/materials/stick' },
      { title: 'Кожа', href: '/pages/materials/leather' },
      { title: 'Трава', href: '/pages/materials/grass' },
    ],
  },
  {
    title: 'Инструменты',
    icon: Pickaxe,
    children: [
      { title: 'Киянка', href: '/pages/tools/mallet' },
    ],
  },
];

// Функция поиска остается без изменений, так как она не использует иконки
export function findCategoryByPath(pathname: string): string | null {
  // ... ваш старый код функции ...
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  for (const item of navigation) {
    if (item.href) {
      const normalizedHref = item.href.endsWith('/') && item.href !== '/'
        ? item.href.slice(0, -1)
        : item.href;
      if (normalizedHref === normalizedPathname) return item.title;
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.href) {
          const normalizedHref = child.href.endsWith('/') && child.href !== '/'
            ? child.href.slice(0, -1)
            : child.href;
          if (normalizedHref === normalizedPathname) return item.title;
        }
      }
    }
  }
  return null;
}