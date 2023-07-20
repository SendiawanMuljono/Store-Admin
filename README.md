# Store-Admin
Store admin project using Spring Boot Java and React js

Setup Database
1. Install XAMPP
2. Buka XAMPP kemudian start Apache dan MySQL
3. Pilih Admin pada baris MySQL dalam XAMPP
4. Terbuka phpMyAdmin kemudian pilih New dan masukan "store_db" sebagai database name
5. Klik Create
6. Pilih "store_db" pada bagian kanan lalu pilih "Import" pada bagian atas
7. Pilih Choose File, lalu pilih store_db.sql dan klik Go pada bawah kanan

Setup Backend
1. Buat folder kosong contohnya "sts-workspace" sebagai workspace dari SpringToolSuite4
2. Pindahkan folder "demo" ke dalam sts-workspace tersebut
3. Buka SpringToolSuite4 dan pilih directory "sts-workspace" tersebut lalu klik Launch
4. Klik File > Import > Existing Projects into Workspace > Browse... > pilih directory dari folder "demo" > Finish
5. Folder "demo" akan ada pada sebelah kiri di dalam Package Explorer
6. Klik kanan folder "demo" > Run As > Maven Install
7. Setelah dependencies terinstall, klik kanan folder "demo" > Run As > Spring Boot App
8. Backend berhasil dijalankan pada http://localhost:8080

Setup Frontend
1. Buka folder "store-app" ke dalam Visual Studio Code
2. Klik Ctrl + ` untuk membuka terminal
3. Pada terminal, ketik "npm install" dan tunggu hingga semua library terinstall
4. Setelah terinstall, ketik "npm start" pada terminal
5. Frontend berhasil dijalankan pada http://localhost:3000
