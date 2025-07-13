---
tags: [React, Vite, 前端, 教學]
date: 2024-01-10
---

# React 開發最佳實踐

## 前言

在現代前端開發中，React 已經成為最受歡迎的 JavaScript 框架之一。本文將分享一些 React 開發的最佳實踐，幫助您寫出更乾淨、更易維護的程式碼。

## 1. 組件設計原則

### 單一職責原則

每個組件應該只負責一個特定的功能。例如：

```jsx
// 好的做法
const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

// 避免這樣做
const UserProfile = ({ user }) => {
  // 不要在這裡處理太多邏輯
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // ... 更多不相關的狀態
};
```

### 組件命名

使用 PascalCase 命名組件，並使用描述性的名稱：

```jsx
// 好的命名
const UserCard = () => {};
const ProductList = () => {};
const NavigationBar = () => {};

// 避免
const Card = () => {};
const List = () => {};
```

## 2. Hooks 使用技巧

### useState 最佳實踐

```jsx
// 使用函數初始化狀態
const [count, setCount] = useState(() => {
  const savedCount = localStorage.getItem('count');
  return savedCount ? parseInt(savedCount) : 0;
});

// 使用函數更新狀態
setCount(prevCount => prevCount + 1);
```

### useEffect 清理

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // 重要：清理副作用
  return () => clearInterval(timer);
}, []);
```

## 3. 效能優化

### 使用 React.memo

```jsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* 複雜的渲染邏輯 */}</div>;
});
```

### 使用 useMemo 和 useCallback

```jsx
const MemoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

const MemoizedCallback = useCallback(() => {
  handleClick(id);
}, [id]);
```

## 4. 錯誤處理

### 錯誤邊界

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## 5. 測試策略

### 單元測試

```jsx
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders user name', () => {
  const user = { name: 'John Doe', email: 'john@example.com' };
  render(<UserProfile user={user} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

## 總結

遵循這些最佳實踐可以幫助您：

- 寫出更易維護的程式碼
- 提升應用程式效能
- 減少 bug 的產生
- 提高團隊開發效率

記住，好的程式碼不僅要能運行，更要易讀、易維護！

---

*參考資料: React 官方文檔* 