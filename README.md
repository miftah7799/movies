# movies

> 🍿 A TMDB client build with Next.js 14

Welcome to the "movies" web app! This app allows you to search for movies, TV shows, or people by title and view their details, including overview, release date, and average rating. You can also watch movie trailers and browse popular movies, top-rated movies, upcoming movies, and now playing movies.

The app is built using Next.js, a React framework for building server-side rendered and static websites. It also utilizes Tailwind CSS, a utility-first CSS framework for rapidly building custom designs. The Movie Database API is used to access a vast collection of movie and TV show data.

To get started with the app, follow the steps outlined in the "Getting Started" section of this README. Contributions are welcome, so if you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

Happy movie browsing!

<img src="https://api.microlink.io/?url=https://movies-topaz-gamma.vercel.app&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29" />

## Getting Started

To get started with the Movies web app, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/oktay/movies.git
```

2. Install the dependencies:

```bash
cd movies
npm install
```

3. Obtain an API key from [The Movie Database API](https://developers.themoviedb.org/3) and add it to the `.env.local` file:

```bash
TMDB_KEY=your-api-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to view the Movies web app.

## Features

- Search for movies, TV shows, or people by title.
- View movie details, including overview, release date, and average rating.
- Watch movie trailers.
- Browse popular movies, top-rated movies, upcoming movies, and now playing movies.
- Responsive design optimized for mobile, tablet, and desktop devices.

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static websites.
- [shadcn/ui](https://ui.shadcn.com/) - UI library for fundamental ui elements.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [The Movie Database API](https://developers.themoviedb.org/3) - An API that provides access to a vast collection of movie and TV show data.
- [Vercel](https://vercel.com/) - A cloud platform for static sites and serverless functions.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Tutorial

Cara menambah lp subdomain:

1. buka docker-compose.yml:
   salin kode ini 
```bash
(sesuaikan-nama):
    image: roisfaozi/kingbyt:latest
    container_name: (sesuaikan-nama)
    ports:
      - "8081:3000" //ganti ports depan sesuai urutan subdomain sebelumnya. contoh: 8081:3000 jadi 8082:3000
    environment:
      - NEXT_PUBLIC_APP_NAME=(sesuaikan-nama) //contoh: Ali
      - TMDB_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTI2NWE3Y2EyOWMyMjA5MDBiMTdiYzQ2YjgwNDkxMSIsIm5iZiI6MTYyMzI1ODIzMy44NDMwMDAyLCJzdWIiOiI2MGMwZjQ3OThlZGE4NzAwNmQ3MzlkNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.McIfqANBzYTIh12NdUhWz8FnvyKDBBmcrbyl9itmrao
      - NEXT_PUBLIC_SCRIPT_SRC=//conceivesaucerfalcon.com/f5a73ef3091d38301304ffb006681213/invoke.js
      - NEXT_PUBLIC_KEY=f5a73ef3091d38301304ffb006681213
      - NEXT_PUBLIC_DIRECT_LINK=https://conceivesaucerfalcon.com/jydku1nj?key=c3d7818efc4bf1bf72c9e4c0b0ba8972
      - NEXT_PUBLIC_FORMAT=iframe
      - NEXT_PUBLIC_HEIGHT=50
      - NEXT_PUBLIC_WIDTH=320
      - NEXT_PUBLIC_PARAMS={}
      - NEXT_AUTH_USER=lele
      - NEXT_AUTH_PASSWORD=lele123
      - AUTH_SECRET=secret
    networks:
      - my_network
```

2. Buka nginx.conf:
salin kode ini
```bash
server {
        listen 80;
        server_name (subdomain).kingbyt.com; // sesuaikan nama subdomain yang akan dirubah

        location / {
            proxy_pass http://(nama):3000; // sesuaikan dengan nama aplikasi yang baru ditambahkan di docker-compose.yml
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
```

3. jalankan kode dibawah:

```bash
docker compose up -d
```
setelah itu cek apakah subdomain sudah berjalan
4. Jika belum berjalan coba kode ini:

```bash
docker compose up -d --force-recreate
```
setelah itu cek lagi
