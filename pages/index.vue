<script setup>
import { useBookStore } from '@/stores/bookStore';
import { reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

definePageMeta({ middleware: 'auth' });

const $toast = useToast();
const bookStore = useBookStore();
bookStore.getBooks();
const headers = useRequestHeaders(['cookie']);
const { data: token } = await useFetch('/api/token', { headers });
const access = token.value.jwt;

const addBook = async () => {
  const { status } = await useFetch('http://localhost:8080/books', {
    method: 'post',
    headers: {
      authorization: access,
    },
    body: JSON.stringify(formBook),
  });
  if (status.value === 'success') {
    $toast.success('Berhasil menambah buku');
    for (const key in formBook) {
      formBook[key] = undefined;
    }
    bookStore.getBooks();
  }
  if (status.value === 'error') {
    $toast.error('Gagal menambah buku');
  }
};

const formBook = reactive({
  title: undefined,
  description: undefined,
  image_url: undefined,
  release_year: undefined,
  price: undefined,
  total_page: undefined,
  category_id: undefined,
});

const modalBookDelete = reactive({
  id: undefined,
  isOpen: false,
});

const openModalDeleteBook = (id) => {
  modalBookDelete.id = id;
  modalBookDelete.isOpen = true;
};

const closeModalDeleteBook = () => {
  modalBookDelete.id = undefined;
  modalBookDelete.isOpen = false;
};

const successDeleteBook = () => {
  $toast.success('Berhasil menghapus buku');
  modalBookDelete.id = undefined;
  modalBookDelete.isOpen = false;
  bookStore.getBooks();
};

const editBookValue = ref({
  title: undefined,
  description: undefined,
  image_url: undefined,
  release_year: undefined,
  price: undefined,
  total_page: undefined,
  category_id: undefined,
});

const modalBookEdit = reactive({
  id: undefined,
  isOpen: false,
});

const openModalEditBook = (book) => {
  const { id, menu, ...bookValue } = book;
  editBookValue.value = bookValue;
  modalBookEdit.id = id;
  modalBookEdit.isOpen = true;
};

const closeModalEditBook = () => {
  editBookValue.value = undefined;
  modalBookEdit.id = undefined;
  modalBookEdit.isOpen = false;
};

const editBookError = () => {
  $toast.error('Gagal memperbarui buku');
  editBookValue.value = undefined;
  modalBookEdit.id = undefined;
  modalBookEdit.isOpen = false;
};

const editBookSuccess = () => {
  $toast.success('Berhasil memperbarui buku');
  editBookValue.value = undefined;
  modalBookEdit.id = undefined;
  modalBookEdit.isOpen = false;
  bookStore.getBooks();
};

const modalDetail = reactive({
  index: undefined,
  isOpen: false,
});
const openModalDetail = (index) => {
  modalDetail.index = index;
  modalDetail.isOpen = true;
};

const closeModalDetail = () => {
  modalDetail.index = undefined;
  modalDetail.isOpen = false;
};
</script>

<template>
  <main class="w-full px-4 font-montserrat text-[#EEEEEE]">
    <section class="flex w-full justify-center my-4">
      <div
        class="max-w-md w-[40%] h-fit mx-auto bg-[#7E7474] p-8 rounded shadow-md order-2"
      >
        <h2 class="text-2xl font-semibold mb-4 text-center">Tambah Buku</h2>
        <form @submit.prevent="addBook">
          <div class="mb-4">
            <label
              for="title"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Title</label
            >
            <input
              type="text"
              id="title"
              name="title"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.title"
            />
          </div>

          <div class="mb-4">
            <label
              for="description"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              rows="4"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="image"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Image URL</label
            >
            <input
              type="text"
              id="image"
              name="image"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.image_url"
            />
          </div>

          <div class="mb-4">
            <label
              for="release_year"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Release Year</label
            >
            <input
              type="number"
              id="release_year"
              name="release_year"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.release_year"
            />
          </div>

          <div class="mb-4">
            <label
              for="price"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Price</label
            >
            <input
              type="text"
              id="price"
              name="price"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.price"
            />
          </div>

          <div class="mb-4">
            <label
              for="total_page"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Total Page</label
            >
            <input
              type="number"
              id="total_page"
              name="total_page"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.total_page"
            />
          </div>

          <div class="mb-4">
            <label
              for="category_id"
              class="block text-[#EEEEEE] text-sm font-medium mb-2"
              >Category ID</label
            >
            <input
              type="number"
              id="category_id"
              name="category_id"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
              required
              v-model="formBook.category_id"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#FFDD93] text-slate-50 py-2 px-4 rounded-md hover:bg-[#ffdd93e1] focus:outline-none"
          >
            Simpan Buku
          </button>
        </form>
      </div>
      <div class="w-[60%] flex flex-wrap justify-center gap-6">
        <div
          v-for="(book, index) of bookStore.books"
          :key="book.id"
          class="w-[30%] cursor-pointer transition-transform hover:scale-105 flex flex-col relative order-1"
        >
          <div @click="openModalDetail(index)">
            <div
              class="w-full h-[200px] overflow-hidden rounded-lg shadow-xl mb-4"
            >
              <img
                :src="book.image_url"
                alt="ImageAlbum"
                class="object-cover w-full h-full object-center"
              />
            </div>
            <h1 class="font-semibold text-base mb-1 text-[#DDE6ED]">
              {{ book.title }}
            </h1>
            <span class="font-semibold text-base text-[#9DB2BF]">
              {{ book.price }}
            </span>
          </div>
          <div class="w-10 h-10 absolute right-0 -top-1 z-30">
            <button class="px-3 py-3" @click="book.menu = !book.menu">
              <Icon
                :name="
                  book.menu ? 'material-symbols:close' : 'mdi:dots-vertical'
                "
                size="24px"
                class="text-slate-50"
              />
            </button>
          </div>
          <div
            v-if="book.menu"
            class="w-28 h-14 justify-center items-center bg-[#FFDD93] text-slate-50 absolute flex flex-col right-8 rounded top-3 z-50"
          >
            <button
              class="w-full h-full hover:bg-[#e5c785] rounded"
              @click="openModalEditBook(book)"
            >
              Edit
            </button>
            <button
              class="w-full h-full hover:bg-[#e5c785] rounded"
              @click="openModalDeleteBook(book.id)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <ModalDelete
    v-if="modalBookDelete.isOpen"
    :id="modalBookDelete.id"
    :token="access"
    @cancel-delete="closeModalDeleteBook"
    @success-delete="successDeleteBook"
  >
    <h1 class="text-slate-50 font-semibold text-xl">Hapus buku</h1>
    <p class="font-light text-slate-50">
      Apakah anda yakin ingin menghapus buku ini? buku akan di hapus permanent
      dan tidak dapat di kembalikan
    </p>
  </ModalDelete>

  <ModalEdit
    v-if="modalBookEdit.isOpen"
    @success-edit="editBookSuccess"
    @cancel-edit="closeModalEditBook"
    @error-edit="editBookError"
    :book-value="editBookValue"
    :id="modalBookEdit.id"
    :token="access"
  >
    <h1 class="text-slate-50 font-semibold text-3xl mb-4">Edit Buku</h1>
    <div
      class="flex justify-center mb-4 w-full gap-8 items-center text-[#EEEEEE]"
    >
      <div>
        <div class="mb-4">
          <label
            for="title"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Title</label
          >
          <input
            type="text"
            id="title"
            name="title"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.title"
          />
        </div>

        <div class="mb-4">
          <label
            for="image"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Image URL</label
          >
          <input
            type="text"
            id="image"
            name="image"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.image_url"
          />
        </div>

        <div class="mb-4">
          <label
            for="release_year"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Release Year</label
          >
          <input
            type="number"
            id="release_year"
            name="release_year"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.release_year"
          />
        </div>

        <div class="mb-4">
          <label
            for="price"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Price</label
          >
          <input
            type="text"
            id="price"
            name="price"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.price"
          />
        </div>
      </div>

      <div>
        <div class="mb-4">
          <label
            for="total_page"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Total Page</label
          >
          <input
            type="number"
            id="total_page"
            name="total_page"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.total_page"
          />
        </div>

        <div class="mb-4">
          <label
            for="description"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Description</label
          >
          <textarea
            id="description"
            name="description"
            rows="4"
            class="w-full h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.description"
          ></textarea>
        </div>

        <div class="mb-4">
          <label
            for="category_id"
            class="block text-[#EEEEEE] text-sm font-medium mb-2"
            >Category ID</label
          >
          <input
            type="number"
            id="category_id"
            name="category_id"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#FFDD93] bg-[#7E7474]"
            required
            v-model="editBookValue.category_id"
          />
        </div>
      </div>
    </div>
  </ModalEdit>

  <div v-if="modalDetail.isOpen">
    <div
      class="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center"
    >
      <div
        class="bg-white w-[60%] h-[320px] p-4 gap-6 rounded-lg shadow-md flex"
      >
        <div cla>
          <img
            :src="bookStore.books[modalDetail.index].image_url"
            alt="Book Image"
            class="mb-4 h-full rounded overflow-hidden"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4">
            {{ bookStore.books[modalDetail.index].title }}
          </h2>
          <p class="text-gray-600 mb-4">
            {{ bookStore.books[modalDetail.index].description }}
          </p>
          <div class="flex gap-6">
            <div>
              <p>
                <strong>Release Year:</strong>
                {{ bookStore.books[modalDetail.index].release_year }}
              </p>
              <p>
                <strong>Price:</strong>
                {{ bookStore.books[modalDetail.index].price }}
              </p>
            </div>
            <div>
              <p>
                <strong>Total Pages:</strong>
                {{ bookStore.books[modalDetail.index].total_page }}
              </p>
              <p>
                <strong>Category ID:</strong>
                {{ bookStore.books[modalDetail.index].category_id }}
              </p>
            </div>
          </div>

          <button
            @click="closeModalDetail"
            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 transition mt-4"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
