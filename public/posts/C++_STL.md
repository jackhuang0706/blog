---
tags: [C++,Data Structure]
date: 2025-07-19
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

## 堆積（Heap）
堆積是一種樹狀資料結構，通常用於實現 Top k 的問題。若以 Binary Heap 來說，它必然是一棵完全二元樹（Complete Binary Tree），其中每個母節點的值會和子節點有一定的相關性，可以是母節點必大於子節點（Max Heap）或必小於子節點（Min Heap），同時 priority_queue 便是利用 Heap 的原理來建立的資料結構。

### Binary Heap（Max Heap & Min Heap）
功能：
- 建立堆積（build）：$O(n)$
- 插入新節點（push）：$O(\log n)$
- 查詢樹根（堆積裡的 Max or Min 值）（top）：$O(1)$
- 刪除樹根（pop）：$O(\log n)$

#### Code
```cpp
/* 額外引入標頭檔
#include <vector>
#include <stdexcept>
*/

// 以 max-heap 為例
class max_heap {
private:
    vector<int> tree;

    void heapify(int root, int len) { // 由上往下重新整理 Heap 結構
        int lc = 2 * root + 1;
        int rc = 2 * root + 2;
        int largest = root;

        if (lc < len && tree[largest] < tree[lc]) {
            largest = lc;
        }
        if (rc < len && tree[largest] < tree[rc]) {
            largest = rc;
        }
        if (largest != root) {
            swap(tree[root], tree[largest]);
            heapify(largest, len);
        }
    }

public:
    void build(const vector<int>& arr) { // 建立 Heap 結構
        tree = arr;
        int start = (int)tree.size() / 2 - 1;
        int len = tree.size();
        for (int cur = start; cur >= 0; cur--) {
            heapify(cur, len);
        }
    }

    void push(int val) { // 加入新 Data
        tree.emplace_back(val);
        int cur = (int)tree.size() - 1;
        int parent = (cur - 1) / 2;
        while (cur > 0 && tree[cur] > tree[parent]) {
            swap(tree[parent], tree[cur]);
            cur = parent;
            parent = (cur - 1) / 2;
        }
    }

    void pop() { // 刪除根節點
        if (tree.empty()) {
            throw runtime_error("empty heap"); // 丟出異常
        }
        tree[0] = tree.back();
        tree.pop_back();
        if (tree.empty()) {
            return;
        }
        heapify(0, (int)tree.size());
    }

    int top() const { // 查詢根節點
        if (tree.empty()) {
            throw runtime_error("empty heap"); // 丟出異常
        }
        return tree[0];
    }
};
```

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
- [資料結構大便當： Binary Heap](https://medium.com/@Kadai/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E5%A4%A7%E4%BE%BF%E7%95%B6-binary-heap-ec47ca7aebac)
- [二元堆積 (Binary Heap)、最小堆積 (Min Heap) 與最大堆積 (Max Heap)](https://www.shubo.io/binary-heap/)
- [來征服資料結構與演算法吧 | 搞懂 Binary Heap 的排序原理](https://medium.com/starbugs/%E4%BE%86%E5%BE%81%E6%9C%8D%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E8%88%87%E6%BC%94%E7%AE%97%E6%B3%95%E5%90%A7-%E6%90%9E%E6%87%82-binary-heap-%E7%9A%84%E6%8E%92%E5%BA%8F%E5%8E%9F%E7%90%86-96768ea30d3f)
## 待補洞
- 構造函數
- 析構函數