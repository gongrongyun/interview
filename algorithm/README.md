## 快排

> ```js
> function quickSort(arr, left, right) {
>   const temp = arr[left];
>   let i = left,
>     j = right;
>   while (i < j) {
>     while (arr[j] >= temp && i < j) j--;
>     while (arr[i] <= temp && i < j) i++;
>     swap(arr[i], arr[j]);
>   }
>   arr[left] = arr[i];
>   arr[i] = temp;
>   quickSort(arr, left, i - 1);
>   quickSort(arr, i + 1, right);
> }
> ```

## 二叉树镜像
