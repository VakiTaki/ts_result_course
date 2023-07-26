//Запуск:
//tsc
//node app

//Задание 2
interface ICreditParams {
  price: number;
  discount: number;
  isInstallment: boolean;
  months: number;
}

const totalPrice = ({
  price,
  discount,
  isInstallment,
  months,
}: ICreditParams): number => {
  if (price > 0 && discount >= 0 && discount <= 100 && months > 0) {
    return Math.round(
      (price * (1 - discount / 100)) / (isInstallment ? months : 1)
    );
  }
  return 0;
};

console.log(
  totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 })
); // 6250

//Задание 3
interface IPost {
  id: string;
  title: string;
  body: string;
}

interface IPostsNorm {
  [key: string]: IPost;
}

interface INormalizePosts {
  byId: IPostsNorm;
  allIds: string[];
}

const posts: IPost[] = [
  {
    id: "62e69d5a5458aac0ed320b35",
    title: "id labore ex et quam laborum",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eostempora quo necessitatibusdolor quam autem quasireiciendis et nam sapiente accusantium",
  },
  {
    id: "62e69d5a5458aac0ed320b1c",
    title: "quo vero reiciendis velit similique earum",
    body: "est natus enim nihil est dolore omnis voluptatem numquamet omnis occaecati quod ullam at voluptatem error expedita pariaturnihil sint nostrum voluptatem reiciendis et",
  },
  {
    id: "62e69d5a5458aac0ed320b32",
    title: "odio adipisci rerum aut animi",
    body: "quia molestiae reprehenderit quasi aspernaturaut expedita occaecati aliquam eveniet laudantiumomnis quibusdam delectus saepe quia accusamus maiores nam estcum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  // {
  //   id: "62e69d5a5458aac0ed320b39",
  //   title: "alias odio sit",
  //   body: "non et atqueoccaecati deserunt quas accusantium unde odit nobis qui voluptatemquia voluptas consequuntur itaque doloret qui rerum deleniti ut occaecati",
  // },
  // {
  //   id: "62e69d5a5458aac0ed320b53",
  //   title: "vero eaque aliquid doloribus et culpa",
  //   body: "harum non quasi et rationetempore iure ex voluptates in rationeharum architecto fugit inventore cupiditatevoluptates magni quo et",
  // },
  // {
  //   id: "62e69d5a5458aac0ed320b19",
  //   title: "et fugit eligendi deleniti quidem qui sint nihil autem",
  //   body: "doloribus at sed quis culpa deserunt consectetur qui praesentiumaccusamus fugiat dictavoluptatem rerum ut voluptate autemvoluptatem repellendus aspernatur dolorem in",
  // },
  // {
  //   id: "62e69d5a5458aac0ed320b25",
  //   title: "repellat consequatur praesentium vel minus molestias voluptatum",
  //   body: "maiores sed dolores similique labore et inventore etquasi temporibus esse sunt id eteos voluptatem aliquamratione corporis molestiae mollitia quia et magnam dolor",
  // },
];

const normalizeData = (unnormalizedData: IPost[]): INormalizePosts => {
  return {
    byId: unnormalizedData.reduce(
      (acc, post) => ({ ...acc, [post.id]: post }),
      {}
    ),
    allIds: unnormalizedData.map((post) => post.id),
  };
};

console.log(normalizeData(posts));
/**
 * {
 *    byId: {
 *      62e69d5a5458aac0ed320b35: { id: '...', title: '...', body: '...' },
 *      62e69d5a5458aac0ed320b1c: { id: '...', title: '...', body: '...' },
 *      ...
 *    },
 *    allIds: ['62e69d5a5458aac0ed320b35', '62e69d5a5458aac0ed320b1c', ...]
 * }
 */

//Задание 4

interface IFetchPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments?postId=2";

//Ассинхронная функция
const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
};

//Через промис
const getData2 = <T>(url: string): Promise<T> => {
  return fetch(url).then((response) => response.json());
};

getData<IFetchPost[]>(COMMENTS_URL).then((data) => {
  data.forEach((post) => {
    console.log("ID: ", post.id, " Email: ", post.email);
  });
});

// getData2<IFetchPost[]>(COMMENTS_URL).then((data) => {
//   data.forEach((post) => {
//     console.log("ID: ", post.id, " Email: ", post.email);
//   });
// });

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */
