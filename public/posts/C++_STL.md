---
tags: [Data Structure,C++]
date: 2025-07-16
---

# C++ 資料結構

## C++ Containers & Header
- vector（in \<vector\>）
- stack（in \<stack\>）
- queue（in \<queue\>）
- deque（in \<deque\>）
- set, multiset（in \<set\>）
- unordered_set（in \<unordered_set\>）
- map, multimap（in \<map\>）
- unordered_map（in \<unordered_map\>）
- priority_queue（in \<queue\>）
- pair（in \<utility\>）

## 鏈結串列（Linked List）
Linked List 是一個含 Head 及 Tail 的資料結構，由一連串的節點組成，每個節點儲存著當前節點的數據及指向下一個節點的指標。

### 單向鏈結串列（Singly Linked List）
功能：
- 末端插入節點（append）：$O(1)$
- 插入節點（push）：最壞 $O(n)$
- 刪除節點（pop）：最壞 $O(n)$
- 遍歷節點（traverse）：$O(n)$

#### Code
```cpp
class node { // 定義節點型態
    friend class linked_list;
protected:
    int val;
    node* next;
public:
    node() : val(0), next(nullptr) {}
    node(int value) : val(value), next(nullptr) {}
    node(int value, node* nxt) : val(value), next(nxt) {}
};

class linked_list {
private:
    node* head;
    node* tail;
    int len;
public:
    linked_list() : head(new node()), tail(head), len(0) {}
    
    ~linked_list() { // 清空 list 並釋放記憶體(析構函數)
        node* temp = head;
        while (temp) {
            node* nxt = temp->next;
            delete temp;
            temp = nxt;
        }
        head = nullptr;
        tail = nullptr;
    }
    
    void append(int value) { // 末端插入節點
        node* newnode = new node(value);
        tail->next = newnode;
        tail = newnode;
        len++;
    }
    
    void push(int idx, int value) { // 插入節點(在索引值idx後)
        if (idx < 1 || idx > len) return;
        node* temp = head;
        while (idx--) {
            temp = temp->next;
        }
        node* newnode = new node(value, temp->next);
        temp->next = newnode;
        if (newnode->next == nullptr) tail = newnode;
        len++;
    }
    
    void pop(int idx) { // 刪除第 idx 個節點
        if (idx < 1 || idx > len || !head->next) return;
        node* temp = head;
        idx--;
        while (idx--) {
            temp = temp->next;
        }
        node* delete_node = temp->next;
        if (delete_node == tail) tail = temp;
        temp->next = delete_node->next;
        delete delete_node;
        len--;
    }
    
    void traverse() const { // 遍歷節點
        if (!head->next) {
            cout << "empty list\n";
            return;
        }
        node* temp = head->next;
        while (temp) {
            cout << temp->val << " ";
            temp = temp->next;
        }
        cout << "\n";
    }
    
    int length() const { // 長度詢問
        return len;
    }
};

// 函式沒有任何變量時加上 const

/* 呼叫：
linked_list l;
l.append(value);
l.push(idx,value);
l.pop(idx);
l.traverse();
int s=l.length(); */
```

## Heap

## Treap

## Binary Search Tree

## Binary Indexed Tree（Fenwick Tree）

## Sparse Table

## Segment Tree

## Link-Cut Tree
## 參考資料
- [競程入門筆記](https://kelly-lu.gitbook.io/jing-cheng-ru-men-bi-ji/jing-cheng-xue-xi-di-tu)
- [cpp reference](https://cplusplus.com/reference/)
- [C++ 資料結構 (Data Structure)](https://andyli.tw/data-structure/)
- [資料結構學習筆記 — 1. Singly Linked List 單向資料鏈結](https://medium.com/@amber.fragments/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-1-singly-linked-list-%E5%96%AE%E5%90%91%E8%B3%87%E6%96%99%E9%8F%88%E7%B5%90-c5bb83e3f75d)

## 補洞
- 構造函數
- 析構函數