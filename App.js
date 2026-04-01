import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av'; // Ses kütüphanesi eklendi

// --- ANA SORU HAVUZU ---
const TUM_SORULAR_LISTESI = [
    { cat: "COĞRAFYA", soru: "Dünyanın en derin noktası Mariana Çukuru hangi okyanustadır?", siklar: ["Hint", "Atlas", "Büyük Okyanus", "Arktik"], cevap: "Büyük Okyanus" },
    { cat: "COĞRAFYA", soru: "Yüzölçümü en büyük ülke hangisidir?", siklar: ["Çin", "ABD", "Kanada", "Rusya"], cevap: "Rusya" },
    { cat: "COĞRAFYA", soru: "Brezilya'nın başkenti hangisidir?", siklar: ["Rio", "Brasilia", "Sao Paulo", "Salvador"], cevap: "Brasilia" },
    { cat: "COĞRAFYA", soru: "Türkiye'nin en yüksek dağı hangisidir?", siklar: ["Erciyes", "Ağrı", "Süphan", "Kaçkar"], cevap: "Ağrı" },
    { cat: "COĞRAFYA", soru: "Güneşe en yakın gezegen hangisidir?", siklar: ["Venüs", "Mars", "Merkür", "Dünya"], cevap: "Merkür" },
    { cat: "COĞRAFYA", soru: "Mısır Piramitleri hangi şehirdedir?", siklar: ["Kahire", "İskenderiye", "Gize", "Luksor"], cevap: "Gize" },
    { cat: "COĞRAFYA", soru: "Dünyanın en uzun nehri hangisidir?", siklar: ["Amazon", "Nil", "Ganj", "Fırat"], cevap: "Nil" },
    { cat: "COĞRAFYA", soru: "İtalya'nın başkenti neresidir?", siklar: ["Venedik", "Napoli", "Roma", "Milano"], cevap: "Roma" },
    { cat: "COĞRAFYA", soru: "Japonya'nın yerel adı nedir?", siklar: ["Nippon", "Chosen", "Siam", "Cathay"], cevap: "Nippon" },
    { cat: "COĞRAFYA", soru: "Hangi ülke tamamen adadan oluşur?", siklar: ["Mısır", "İzlanda", "Almanya", "İran"], cevap: "İzlanda" },
    { cat: "COĞRAFYA", soru: "Dünyanın en kalabalık ülkesi hangisidir?", siklar: ["Çin", "Hindistan", "ABD", "Endonezya"], cevap: "Hindistan" },
    { cat: "COĞRAFYA", soru: "Kızıl Gezegen olarak birincisi hangisidir?", siklar: ["Venüs", "Mars", "Jüpiter", "Satürn"], cevap: "Mars" },
    { cat: "COĞRAFYA", soru: "En büyük okyanus hangisidir?", siklar: ["Atlas", "Hint", "Pasifik", "Arktik"], cevap: "Pasifik" },
    { cat: "COĞRAFYA", soru: "Avrupa'nın en yüksek dağı hangisidir?", siklar: ["Alpler", "Mont Blanc", "Elbruz", "Olimpos"], cevap: "Elbruz" },
    { cat: "COĞRAFYA", soru: "Türkiye'nin en büyük gölü hangisidir?", siklar: ["Tuz Gölü", "Van Gölü", "Beyşehir Gölü", "Eğirdir Gölü"], cevap: "Van Gölü" },
    { cat: "COĞRAFYA", soru: "Kanada'nın başkenti neresidir?", siklar: ["Toronto", "Montreal", "Ottawa", "Vancouver"], cevap: "Ottawa" },
    { cat: "COĞRAFYA", soru: "En çok komşusu olan ülke hangisidir?", siklar: ["Rusya", "Çin", "Brezilya", "Fransa"], cevap: "Çin" },
    { cat: "COĞRAFYA", soru: "Avustralya'nın başkenti neresidir?", siklar: ["Sydney", "Melbourne", "Canberra", "Perth"], cevap: "Canberra" },
    { cat: "COĞRAFYA", soru: "Ekvator hangi kıtadan geçmez?", siklar: ["Afrika", "Asya", "Güney Amerika", "Avrupa"], cevap: "Avrupa" },
    { cat: "COĞRAFYA", soru: "Sahara Çölü hangi kıtadadır?", siklar: ["Asya", "Afrika", "Avustralya", "Amerika"], cevap: "Afrika" },
    { cat: "TARİH", soru: "İstanbul hangi yıl fethedilmiştir?", siklar: ["1071", "1299", "1453", "1517"], cevap: "1453" },
    { cat: "TARİH", soru: "Fransız İhtilali hangi yılda gerçekleşti?", siklar: ["1789", "1815", "1914", "1453"], cevap: "1789" },
    { cat: "TARİH", soru: "Türkiye Cumhuriyeti kaç yılında kuruldu?", siklar: ["1920", "1923", "1930", "1938"], cevap: "1923" },
    { cat: "TARİH", soru: "Osmanlı Devleti'nin ilk başkenti neresidir?", siklar: ["Bursa", "Söğüt", "Edirne", "İstanbul"], cevap: "Söğüt" },
    { cat: "TARİH", soru: "Malazgirt Meydan Muharebesi ne zaman oldu?", siklar: ["1071", "1453", "1299", "1517"], cevap: "1071" },
    { cat: "TARİH", soru: "İlk sesli sinema filmi ne zaman çekildi?", siklar: ["1895", "1920", "1927", "1935"], cevap: "1927" },
    { cat: "TARİH", soru: "Kurtuluş Savaşı hangi olayla başladı?", siklar: ["Erzurum Kongresi", "Sivas Kongresi", "19 Mayıs 1919", "TBMM Açılışı"], cevap: "19 Mayıs 1919" },
    { cat: "TARİH", soru: "Amerika kıtasını kim keşfetti?", siklar: ["Vasco da Gama", "Kristof Kolomb", "Macellan", "Marco Polo"], cevap: "Kristof Kolomb" },
    { cat: "TARİH", soru: "Hititlerin başkenti neresidir?", siklar: ["Efes", "Truva", "Hattuşaş", "Sard"], cevap: "Hattuşaş" },
    { cat: "TARİH", soru: "Pusulayı kim icat etmiştir?", siklar: ["Romalılar", "Mısırlılar", "Yunanlar", "Çinliler"], cevap: "Çinliler" },
    { cat: "TARİH", soru: "Mona Lisa tablosunu kim yaptı?", siklar: ["Michelangelo", "Raphael", "Da Vinci", "Donatello"], cevap: "Da Vinci" },
    { cat: "TARİH", soru: "Rönesans nerede başlamıştır?", siklar: ["Fransa", "Almanya", "İtalya", "İngiltere"], cevap: "İtalya" },
    { cat: "TARİH", soru: "Atatürk'ün doğum yeri neresidir?", siklar: ["Ankara", "Selanik", "Manastır", "İstanbul"], cevap: "Selanik" },
    { cat: "TARİH", soru: "Lozan Antlaşması hangi yılda imzalandı?", siklar: ["1920", "1922", "1923", "1924"], cevap: "1923" },
    { cat: "TARİH", soru: "Magna Carta hangi ülkede imzalandı?", siklar: ["Fransa", "İspanya", "İngiltere", "Almanya"], cevap: "İngiltere" },
    { cat: "TARİH", soru: "Sümerlerin en büyük buluşu nedir?", siklar: ["Para", "Tekerlek", "Yazı", "Barut"], cevap: "Yazı" },
    { cat: "TARİH", soru: "NATO hangi yıl kuruldu?", siklar: ["1945", "1949", "1952", "1960"], cevap: "1949" },
    { cat: "TARİH", soru: "İlk halife kimdir?", siklar: ["Hz. Ömer", "Hz. Ali", "Hz. Ebubekir", "Hz. Osman"], cevap: "Hz. Ebubekir" },
    { cat: "TARİH", soru: "Bizans İmparatorluğu'nun diğer adı nedir?", siklar: ["Kutsal Roma", "Doğu Roma", "Batı Roma", "Pers"], cevap: "Doğu Roma" },
    { cat: "TARİH", soru: "Kıbrıs Barış Harekatı yılı kaçtır?", siklar: ["1963", "1967", "1974", "1980"], cevap: "1974" },
    { cat: "SPOR", soru: "Basketbolda bir takım sahada kaç oyuncu ile mücadele eder?", siklar: ["4", "5", "6", "11"], cevap: "5" },
    { cat: "SPOR", soru: "Teniste dört büyük turnuvaya verilen genel isim nedir?", siklar: ["NBA", "Final Four", "Grand Slam", "Champions League"], cevap: "Grand Slam" },
    { cat: "SPOR", soru: "Olimpiyat oyunları kaç yılda bir düzenlenir?", siklar: ["2", "3", "4", "5"], cevap: "4" },
    { cat: "SPOR", soru: "Voleybolda bir set kaç sayıda biter?", siklar: ["15", "21", "25", "30"], cevap: "25" },
    { cat: "SPOR", soru: "Şampiyonlar Ligi kupasını en çok kazanan futbol takımı hangisidir?", siklar: ["Milan", "Liverpool", "Real Madrid", "Barcelona"], cevap: "Real Madrid" },
    { cat: "SPOR", soru: "NBA tarihinin en çok sayı atan oyuncusu kimdir?", siklar: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Shaq"], cevap: "LeBron James" },
    { cat: "SPOR", soru: "Yüzmede 'kelebek' stiti hangi spor dalına aittir?", siklar: ["Atletizm", "Yüzme", "Jimnastik", "Eskrim"], cevap: "Yüzme" },
    { cat: "SPOR", soru: "Modern Olimpiyatlar ilk kez hangi şehirde düzenlenmiştir?", siklar: ["Roma", "Paris", "Londra", "Atina"], cevap: "Atina" },
    { cat: "SPOR", soru: "Dünya Kupası'nı en çok kazanan ülke hangisidir?", siklar: ["Almanya", "İtalya", "Brezilya", "Arjantin"], cevap: "Brezilya" },
    { cat: "SPOR", soru: "Hangi tenisçi 'Toprağın Kralı' lakabıyla bilinir?", siklar: ["Federer", "Nadal", "Djokovic", "Agassi"], cevap: "Nadal" },
    { cat: "SPOR", soru: "Okçulukta hedefin en orta noktasının rengi nedir?", siklar: ["Kırmızı", "Mavi", "Sarı", "Beyaz"], cevap: "Sarı" },
    { cat: "SPOR", soru: "Formula 1 tarihinde en çok şampiyonluk yaşayan iki pilot kimdir?", siklar: ["Senna-Prost", "Hamilton-Schumacher", "Vettel-Alonso", "Lauda-Hunt"], cevap: "Hamilton-Schumacher" },
    { cat: "SPOR", soru: "Hangi Türk takımı UEFA Kupası'nı kazanmıştır?", siklar: ["Fenerbahçe", "Beşiktaş", "Galatasaray", "Trabzonspor"], cevap: "Galatasaray" },
    { cat: "SPOR", soru: "Maraton mesafesi yaklaşık kaç kilometredir?", siklar: ["10", "21", "42", "50"], cevap: "42" },
    { cat: "SPOR", soru: "Buz hokeyi maçları kaç devre (periyot) oynanır?", siklar: ["2", "3", "4", "5"], cevap: "3" },
    { cat: "SPOR", soru: "Amerikan futbolunda topu kaleye taşımaya ne denir?", siklar: ["Home run", "Touchdown", "Basket", "Smash"], cevap: "Touchdown" },
    { cat: "SPOR", soru: "Usain Bolt hangi branşta dünya rekoru sahibidir?", siklar: ["100 Metre", "Uzun Atlama", "Yüzme", "Gülle Atma"], cevap: "100 Metre" },
    { cat: "SPOR", soru: "Filenin Sultanları hangi branşta dünya şampiyonu olmuştur?", siklar: ["Basketbol", "Hentbol", "Voleybol", "Tenis"], cevap: "Voleybol" },
    { cat: "SPOR", soru: "Bilardoda beyaz topun adı nedir?", siklar: ["Cue Ball", "Striker", "Puck", "Ace"], cevap: "Cue Ball" },
    { cat: "SPOR", soru: "Hangi spor dalında 'Hole-in-one' tabiri kullanılır?", siklar: ["Tenis", "Golf", "Bowling", "Kriket"], cevap: "Golf" },
    { cat: "CANLILIK", soru: "Hücrenin enerji santrali hangisidir?", siklar: ["Ribozom", "Mitokondri", "Lizozom", "Golgi"], cevap: "Mitokondri" },
    { cat: "CANLILIK", soru: "İnsan vücudundaki en büyük organ hangisidir?", siklar: ["Karaciğer", "Akciğer", "Deri", "Kalp"], cevap: "Deri" },
    { cat: "CANLILIK", soru: "Bitkilerin besin üretmesine ne ad verilir?", siklar: ["Fermantasyon", "Solunum", "Fotosentez", "Terleme"], cevap: "Fotosentez" },
    { cat: "CANLILIK", soru: "DNA'nın çift sarmal yapısını keşfeden kimdir?", siklar: ["Newton", "James Watson", "Mendel", "Pasteur"], cevap: "James Watson" },
    { cat: "CANLILIK", soru: "Kalıtım biliminin kurucusu kimdir?", siklar: ["Darwin", "Lamarck", "Gregor Mendel", "Tesla"], cevap: "Gregor Mendel" },
    { cat: "CANLILIK", soru: "Güneş ışığıyla sentezlenen vitamin hangisidir?", siklar: ["A Vitamini", "C Vitamini", "B12", "D Vitamini"], cevap: "D Vitamini" },
    { cat: "CANLILIK", soru: "İnsan kalbi kaç odacıktan oluşur?", siklar: ["2", "3", "4", "5"], cevap: "4" },
    { cat: "CANLILIK", soru: "Kan pıhtılaşmasını sağlayan hücre hangisidir?", siklar: ["Alyuvar", "Akyuvar", "Trombosit", "Plazma"], cevap: "Trombosit" },
    { cat: "CANLILIK", soru: "Mavi balina hangi sınıfa giren bir hayvandır?", siklar: ["Balıklar", "Memeliler", "Sürüngenler", "Amfibiler"], cevap: "Memeliler" },
    { cat: "CANLILIK", soru: "Yetişkin bir insanda kaç adet diş bulunur?", siklar: ["28", "30", "32", "34"], cevap: "32" },
    { cat: "CANLILIK", soru: "Vücudumuzdaki en sert madde hangisidir?", siklar: ["Kemik", "Kıkırdak", "Diş Minesi", "Tırnak"], cevap: "Diş Minesi" },
    { cat: "CANLILIK", soru: "Hangi organ idrar oluşturur?", siklar: ["Mide", "Böbrek", "Pankreas", "Dalak"], cevap: "Böbrek" },
    { cat: "CANLILIK", soru: "Bal arıları nasıl iletişim kurarlar?", siklar: ["Ses çıkararak", "Dans ederek", "Renk değiştirerek", "Dokunarak"], cevap: "Dans ederek" },
    { cat: "CANLILIK", soru: "İnsan vücudunun en uzun kemiği hangisidir?", siklar: ["Kaval kemiği", "Uyluk kemiği", "Pazı kemiği", "Omurga"], cevap: "Uyluk kemiği" },
    { cat: "CANLILIK", soru: "Gözdeki renkli kısma ne ad verilir?", siklar: ["Retina", "Kornea", "İris", "Pupilla"], cevap: "İris" },
    { cat: "CANLILIK", soru: "Proteinlerin yapı taşı nedir?", siklar: ["Glikoz", "Amino asit", "Yağ asidi", "Nükleotid"], cevap: "Amino asit" },
    { cat: "CANLILIK", soru: "Bitki hücresine şekil veren dış yapı hangisidir?", siklar: ["Hücre zarı", "Hücre çeperi", "Sitoplazma", "Çekirdek"], cevap: "Hücre çeperi" },
    { cat: "CANLILIK", soru: "Oksijen taşıyan kırmızı protein hangisidir?", siklar: ["İnsülin", "Keratin", "Hemoglobin", "Kollajen"], cevap: "Hemoglobin" },
    { cat: "CANLILIK", soru: "Ahtapotların kaç tane kalbi vardır?", siklar: ["1", "2", "3", "4"], cevap: "3" },
    { cat: "CANLILIK", soru: "Pastörizasyonu kim bulmuştur?", siklar: ["Newton", "Louis Pasteur", "Edison", "Darwin"], cevap: "Louis Pasteur" },
    { cat: "SİYASET", soru: "Modern siyaset biliminin kurucusu kimdir?", siklar: ["Platon", "Aristo", "Machiavelli", "Hobbes"], cevap: "Machiavelli" },
    { cat: "SİYASET", soru: "Yasama, yürütme ve yargının ayrılmasına ne denir?", siklar: ["Otokrasi", "Kuvvetler Ayrılığı", "Monarşi", "Merkeziyetçilik"], cevap: "Kuvvetler Ayrılığı" },
    { cat: "SİYASET", soru: "Birleşmiş Milletler (BM) Genel Merkezi neresidir?", siklar: ["Cenevre", "Londra", "Paris", "New York"], cevap: "New York" },
    { cat: "SİYASET", soru: "Türkiye'de seçmen yaşı kaçtır?", siklar: ["16", "18", "21", "25"], cevap: "18" },
    { cat: "SİYASET", soru: "Demokrasinin kelime anlamı nedir?", siklar: ["Krallık", "Halkın yönetimi", "Azınlık yönetimi", "Askeri yönetim"], cevap: "Halkın yönetimi" },
    { cat: "SİYASET", soru: "Diplomaside 'persona non grata' ne demektir?", siklar: ["Resmi görevli", "Hoşlanılmayan kişi", "Gizli ajan", "Arabulucu"], cevap: "Hoşlanılmayan kişi" },
    { cat: "SİYASET", soru: "Avrupa Birliği'nin yürütme organı hangisidir?", siklar: ["Avrupa Konseyi", "Avrupa Parlamentosu", "Avrupa Komisyonu", "Adalet Divanı"], cevap: "Avrupa Komisyonu" },
    { cat: "SİYASET", soru: "Toplum Sözleşmesi adlı eserin yazarı kimdir?", siklar: ["J.J. Rousseau", "Karl Marx", "Adam Smith", "John Locke"], cevap: "J.J. Rousseau" },
    { cat: "SİYASET", soru: "Meclisle sınırlı hükümdarlık yönetimi nedir?", siklar: ["Cumhuriyet", "Meşrutiyet", "Teokrasi", "Oligarşi"], cevap: "Meşrutiyet" },
    { cat: "SİYASET", soru: "TBMM ilk kez hangi tarihte açılmıştır?", siklar: ["29 Ekim 1923", "23 Nisan 1920", "30 Ağustos 1922", "19 Mayıs 1919"], cevap: "23 Nisan 1920" },
    { cat: "SİYASET", soru: "Oligarşi kimlerin yönetimidir?", siklar: ["Halkın", "Tek bir kişinin", "Küçük bir grubun", "Din adamlarının"], cevap: "Küçük bir grubun" },
    { cat: "SİYASET", soru: "Liberalizm temel olarak neyi savunur?", siklar: ["Devlet kontrolünü", "Bireysel özgürlüğü", "Sınıfsız toplumu", "Dini kuralları"], cevap: "Bireysel özgürlüğü" },
    { cat: "SİYASET", soru: "Diplomaside en yüksek unvan nedir?", siklar: ["Konsolos", "Ateşe", "Büyükelçi", "Katiplik"], cevap: "Büyükelçi" },
    { cat: "SİYASET", soru: "Demokrasinin beşiği kabul edilen antik şehir hangisidir?", siklar: ["Roma", "Atina", "Isparta", "İstanbul"], cevap: "Atina" },
    { cat: "SİYASET", soru: "Anayasa Mahkemesi'nin temel görevi nedir?", siklar: ["Hükümeti seçmek", "Yasaların anayasaya uygunluğunu denetlemek", "Bütçe hazırlamak", "Vergi toplamak"], cevap: "Yasaların anayasaya uygunluğunu denetlemek" },
    { cat: "SİYASET", soru: "Ütopya adlı eserin yazarı kimdir?", siklar: ["Thomas More", "Francis Bacon", "Erasmus", "Voltaire"], cevap: "Thomas More" },
    { cat: "SİYASET", soru: "Glasnost politikasını başlatan lider kimdir?", siklar: ["Stalin", "Lenin", "Gorbaçov", "Yeltsin"], cevap: "Gorbaçov" },
    { cat: "SİYASET", soru: "İnsan Hakları Evrensel Beyannamesi yılı kaçtır?", siklar: ["1923", "1945", "1948", "1950"], cevap: "1948" },
    { cat: "SİYASET", soru: "Hükümetin parlamento tarafından denetlenmesine ne denir?", siklar: ["Gensoru", "Veto", "Lobi", "Referandum"], cevap: "Gensoru" },
    { cat: "SİYASET", soru: "Laiklik ilkesi neyi ifade eder?", siklar: ["Sınıf ayrımı", "Din ve devlet işlerinin ayrımı", "Ekonomik bağımsızlık", "Tek parti yönetimi"], cevap: "Din ve devlet işlerinin ayrımı" },
    { cat: "GÜNLÜK HAYAT", soru: "Taze yumurta suyun içinde ne yapar?", siklar: ["Yüzmesi", "Batması", "Dik durması", "Çatlaması"], cevap: "Batması" },
    { cat: "GÜNLÜK HAYAT", soru: "Sakız lekesini çıkarmak için en etkili yöntem hangisidir?", siklar: ["Sıcak su", "Tuz", "Buz uygulamak", "Kolonya"], cevap: "Buz uygulamak" },
    { cat: "GÜNLÜK HAYAT", soru: "Çay lekesini çıkarmak için hangisi önerilir?", siklar: ["Limon suyu", "Karbonatlı su", "Sıcak süt", "Zeytinyağı"], cevap: "Karbonatlı su" },
    { cat: "GÜNLÜK HAYAT", soru: "Ayakkabı kokusunu önlemek için içine ne konulabilir?", siklar: ["Karbonat", "Şeker", "Un", "Bulaşık deterjanı"], cevap: "Karbonat" },
    { cat: "GÜNLÜK HAYAT", soru: "Muzların geç kararması için ne yapılmalıdır?", siklar: ["Güneşe koymak", "Saplarını streçlemek", "Suya koymak", "Poşete sarmak"], cevap: "Saplarını streçlemek" },
    { cat: "GÜNLÜK HAYAT", soru: "Parlatıcı yerine doğal olarak ne kullanılabilir?", siklar: ["Limon tuzu", "Elma sirkesi", "Süt", "Tuzlu su"], cevap: "Elma sirkesi" },
    { cat: "GÜNLÜK HAYAT", soru: "Soğan doğrarken göz yaşarmasını önlemek için ne yapılır?", siklar: ["Soğanı ısıtmak", "Sakız çiğnemek", "Eldiven takmak", "Gözleri kapatmak"], cevap: "Sakız çiğnemek" },
    { cat: "GÜNLÜK HAYAT", soru: "Sıkışan kavanoz kapaklarını açmak için ne yapılır?", siklar: ["Soğun su", "Sıcak su", "Yağ sürmek", "Vurmak"], cevap: "Sıcak su" },
    { cat: "GÜNLÜK HAYAT", soru: "Aynaları iz bırakmadan silmek için ne kullanılır?", siklar: ["Pamuklu bez", "Gazete kağıdı", "Havlu", "Sünger"], cevap: "Gazete kağıdı" },
    { cat: "GÜNLÜK HAYAT", soru: "Gümüşleri parlatmak için evde ne kullanılır?", siklar: ["Diş macunu", "Limon", "Yoğurt", "Sirke"], cevap: "Diş macunu" },
    { cat: "GÜNLÜK HAYAT", soru: "Sarımsak kokusunu çıkarmak için neye dokunmak gerekir?", siklar: ["Plastik", "Paslanmaz çelik", "Tahta", "Kumaş"], cevap: "Paslanmaz çelik" },
    { cat: "GÜNLÜK HAYAT", soru: "Bitkilerin canlı görünmesi için toprağına ne dökülebilir?", siklar: ["Çay posası", "Meyve suyu", "Tuz", "Sabunlu su"], cevap: "Çay posası" },
    { cat: "GÜNLÜK HAYAT", soru: "Kesme tahtası kokusunu ne giderir?", siklar: ["Elma", "Yarım limon", "Ekmek", "Domates"], cevap: "Yarım limon" },
    { cat: "GÜNLÜK HAYAT", soru: "Ütü altındaki yanık lekesine ne iyi gelir?", siklar: ["Beyaz sirke ve karbonat", "Yağ", "Sabun", "Alkol"], cevap: "Beyaz sirke ve karbonat" },
    { cat: "GÜNLÜK HAYAT", soru: "Pilavın tane tane olması için hangisi önemlidir?", siklar: ["Suyu sonradan eklemek", "Pirinçleri kavurmak", "Çok karıştırmak", "Soğuk suyla haşlamak"], cevap: "Pirinçleri kavurmak" },
    { cat: "GÜNLÜK HAYAT", soru: "Çileklerin ömrünü uzatmak için neyle yıkanmalıdır?", siklar: ["Sirkeli su", "Şekerli su", "Tuzlu su", "Sütlü su"], cevap: "Sirkeli su" },
    { cat: "GÜNLÜK HAYAT", soru: "Gömlek yakasındaki kiri ne çıkarır?", siklar: ["Şampuan", "Diş macunu", "Kolonya", "Parfüm"], cevap: "Şampuan" },
    { cat: "GÜNLÜK HAYAT", soru: "Makarnanın yapışmaması için suya ne eklenir?", siklar: ["Tuz", "Sıvı yağ", "Süt", "Limon"], cevap: "Sıvı yağ" },
    { cat: "GÜNLÜK HAYAT", soru: "Ekmeğin bayatlamasını geciktirmek için kaba ne konur?", siklar: ["Patates", "Şeker", "Tuz", "Sarımsak"], cevap: "Patates" },
    { cat: "GÜNLÜK HAYAT", soru: "Mürekkep lekesini çıkarmada hangi sıvı etkilidir?", siklar: ["Süt", "Ayran", "Şalgam", "Sirke"], cevap: "Süt" },
];

export default function App() {
    const [para, setPara] = useState(1000);
    const [safha, setSafha] = useState('GIRIS');
    const [oyunModu, setOyunModu] = useState(null);
    const [sorular, setSorular] = useState([]);
    const [mevcutIndex, setMevcutIndex] = useState(0);
    const [dogruSayisi, setDogruSayisi] = useState(0);
    const [sure, setSure] = useState(15);
    const [secilenSik, setSecilenSik] = useState(null);
    const [devreDisiSiklar, setDevreDisiSiklar] = useState([]);
    const [aktifHavuz, setAktifHavuz] = useState([...TUM_SORULAR_LISTESI]);
    const [aiIpucu, setAiIpucu] = useState(null);

    const [cikisModal, setCikisModal] = useState(false);
    const [kayipModal, setKayipModal] = useState(false);

    // --- SES ÇALMA FONKSİYONU ---
    const playSound = async (type) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                type === 'correct'
                    ? { uri: 'https://www.soundjay.com/buttons/sounds/button-3.mp3' } // Örnek Doğru Sesi
                    : { uri: 'https://www.soundjay.com/buttons/sounds/button-10.mp3' } // Örnek Yanlış Sesi
            );
            await sound.playAsync();
        } catch (error) {
            console.log('Ses çalınamadı', error);
        }
    };

    // --- 15 DAKİKADA BİR KENDİ KENDİNE SORU ÜRETME MANTIĞI ---
    useEffect(() => {
        const soruUretimMotoru = setInterval(() => {
            const kategoriler = ["BİLİM", "TEKNOLOJİ", "SANAT", "EDEBİYAT", "FİLOZOFİ", "ASTRONOMİ"];
            const secilenKat = kategoriler[Math.floor(Math.random() * kategoriler.length)];

            const yeniUretilenSoru = {
                cat: secilenKat,
                soru: `${secilenKat} alanında sistem tarafından yeni üretilmiş, 15 dakikalık periyot sorusu?`,
                siklar: ["Cevap A", "Cevap B", "Cevap C", "Cevap D"],
                cevap: "Cevap A"
            };

            setAktifHavuz(eskiHavuz => {
                const varMi = eskiHavuz.find(s => s.soru === yeniUretilenSoru.soru);
                if (!varMi) {
                    return [...eskiHavuz, yeniUretilenSoru];
                }
                return eskiHavuz;
            });
        }, 15 * 60 * 1000);

        return () => clearInterval(soruUretimMotoru);
    }, []);

    const oyunuBaslat = (mod, kategori = 'HEPSİ') => {
        let havuz = kategori === 'HEPSİ' ? [...aktifHavuz] : aktifHavuz.filter(s => s.cat === kategori);
        if (typeof mod === 'number' && havuz.length < mod) {
            let eksik = mod - havuz.length;
            let yedek = aktifHavuz.filter(s => !havuz.includes(s));
            havuz = [...havuz, ...yedek.sort(() => Math.random() - 0.5).slice(0, eksik)];
        }
        if (havuz.length === 0) return;
        let miktar = (mod === 'PRATIK') ? havuz.length : mod;
        const secilenler = [...havuz].sort(() => Math.random() - 0.5).slice(0, miktar);
        setSorular(secilenler);
        setOyunModu(mod);
        setMevcutIndex(0);
        setDogruSayisi(0);
        setSure(15);
        setSecilenSik(null);
        setAiIpucu(null);
        setDevreDisiSiklar([]);
        setKayipModal(false);
        setSafha('OYUN');
    };

    const useAIHint = async () => {
        if (para < 100) { Alert.alert("Hata", "Bakiyen yetersiz!"); return; }
        if (aiIpucu) return;

        const s = sorular[mevcutIndex];
        setPara(prev => prev - 100);
        setAiIpucu("🧠 AI Zihni taranıyor...");

        try {
            const response = await fetch('https://api.textcortex.com/v1/texts/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: `Soru: ${s.soru}. Cevap: ${s.cevap}. Sen Gemini AI'sın. Bu soru için cevabı söylemeden, son derece zekice, edebi ve akıllıca tek cümlelik bir ipucu ver.`,
                    max_tokens: 64,
                    model: "gpt-4-o"
                })
            });

            if (!response.ok) throw new Error();
            const data = await response.json();
            setAiIpucu("🤖 AI: " + data.data.outputs[0].text.trim());

        } catch (error) {
            let analiz = "🤖 AI: ";
            const cev = s.cevap.toLowerCase();
            if (s.cat === "COĞRAFYA") {
                if (cev.includes("rusya") || cev.includes("kanada")) analiz += "Kuzey yarımkürenin devasa yüzölçümlü topraklarını hatırla.";
                else if (cev.includes("okyanus")) analiz += "Bu cevap kıtaları birbirinden ayıran uçsuz bucaksız derinliklerde gizli.";
                else analiz += "Küresel ölçekte, sınırların ötesindeki o özel konumu düşün.";
            } else if (s.cat === "TARİH") {
                const yil = parseInt(cev);
                if (!isNaN(yil)) {
                    if (yil === 1453) analiz += "Çağ kapatıp çağ açan o büyük dönüm noktasına odaklan.";
                    else analiz += "Olayın kronolojik sırasını şıklardaki yüzyıllara göre süz.";
                } else analiz += "Bu isim, tarihin tozlu sayfalarında silinmez izler bırakmış bir figür.";
            } else analiz += "Verilerimi taradığımda, bu cevabın en rasyonel seçenek olduğunu görüyorum.";
            setAiIpucu(analiz);
        }
    };

    const useJoker = () => {
        if (para < 100) { Alert.alert("Hata", "Bakiyen yetersiz!"); return; }
        if (devreDisiSiklar.length > 0) return;
        const yanlislar = sorular[mevcutIndex].siklar.filter(s => s !== sorular[mevcutIndex].cevap);
        const elenecekler = yanlislar.sort(() => Math.random() - 0.5).slice(0, 2);
        setPara(prev => prev - 100);
        setDevreDisiSiklar(elenecekler);
    };

    useEffect(() => {
        if (safha === 'OYUN' && sure > 0 && !secilenSik && !cikisModal && !kayipModal) {
            const timer = setTimeout(() => setSure(s => s - 1), 1000);
            return () => clearTimeout(timer);
        } else if (sure === 0 && !cikisModal && !kayipModal && safha === 'OYUN') {
            hataYapildi();
        }
    }, [sure, safha, secilenSik, cikisModal, kayipModal]);

    const hataYapildi = () => {
        if (oyunModu === 'PRATIK') sonrakiSoru();
        else setKayipModal(true);
    };

    const cevapVer = (sik) => {
        if (secilenSik || devreDisiSiklar.includes(sik)) return;
        setSecilenSik(sik);

        if (sik === sorular[mevcutIndex]?.cevap) {
            playSound('correct'); // Doğru sesini çal
            if (oyunModu === 'PRATIK') { setDogruSayisi(prev => prev + 1); setPara(prev => prev + 5); }
            setTimeout(() => sonrakiSoru(), 1000);
        } else {
            playSound('wrong'); // Yanlış sesini çal
            setTimeout(() => hataYapildi(), 1500);
        }
    };

    const sonrakiSoru = () => {
        if (mevcutIndex < sorular.length - 1) {
            setMevcutIndex(prev => prev + 1);
            setSecilenSik(null);
            setAiIpucu(null);
            setSure(15);
            setDevreDisiSiklar([]);
        } else {
            if (oyunModu !== 'PRATIK') {
                const odul = oyunModu >= 30 ? 1000 : oyunModu >= 20 ? 500 : 100;
                setPara(prev => prev + odul);
                Alert.alert("BAŞARDIN!", `Seri bitti! +${odul} 💰`, [{ text: "TAMAM", onPress: () => anaEkranaDon() }]);
            } else anaEkranaDon();
        }
    };

    const anaEkranaDon = () => {
        setCikisModal(false); setKayipModal(false); setSafha('GIRIS');
        setOyunModu(null); setSecilenSik(null); setSorular([]); setAiIpucu(null);
    };

    const BakiyeGostergesi = () => (
        <View style={styles.fixedPara}><Text style={styles.fixedParaText}>💰 {para} TL</Text></View>
    );

    if (safha === 'GIRIS') {
        return (
            <View style={styles.centerView}>
                <BakiyeGostergesi />
                <Text style={styles.logo}>QUIZ ELITE</Text>
                <TouchableOpacity style={styles.mainBtn} onPress={() => setSafha('MOD_SECIM')}><Text style={styles.btnText}>MEYDAN OKUMA</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.mainBtn, { backgroundColor: '#2ecc71', marginTop: 15 }]} onPress={() => oyunuBaslat('PRATIK')}>
                    <Text style={styles.btnText}>PRATİK MODU</Text>
                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>Her doğru: 5 PARA</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (safha === 'MOD_SECIM') {
        return (
            <View style={styles.centerView}>
                <BakiyeGostergesi />
                <Text style={styles.title}>SERİ SEÇ</Text>
                {[{ m: 10, p: 100 }, { m: 20, p: 500 }, { m: 30, p: 1000 }].map(item => (
                    <TouchableOpacity key={item.m} style={styles.modBtn} onPress={() => { setOyunModu(item.m); setSafha('KAT_SECIM'); }}>
                        <Text style={styles.modBtnText}>{item.m} SORULUK SERİ</Text>
                        <Text style={{ color: '#f1c40f', textAlign: 'center' }}>Kazanç: {item.p} TL</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setSafha('GIRIS')}><Text style={{ color: '#888', marginTop: 20 }}>Geri Dön</Text></TouchableOpacity>
            </View>
        );
    }

    if (safha === 'KAT_SECIM') {
        return (
            <View style={styles.centerView}>
                <BakiyeGostergesi />
                <TouchableOpacity style={styles.catExitBtn} onPress={() => setSafha('MOD_SECIM')}><Text style={styles.exitText}>←</Text></TouchableOpacity>
                <Text style={styles.title}>KATEGORİ</Text>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.catBtn} onPress={() => oyunuBaslat(oyunModu, 'HEPSİ')}><Text style={styles.catBtnText}>KARIŞIK (BEDAVA)</Text></TouchableOpacity>
                    <Text style={{ color: '#f1c40f', marginVertical: 10, fontWeight: 'bold' }}>Özel Seçim (200 💰):</Text>
                    {['TARİH', 'COĞRAFYA', 'SPOR', 'CANLILIK', 'SİYASET', 'GÜNLÜK HAYAT'].map(c => (
                        <TouchableOpacity key={c} disabled={para < 200} style={[styles.catBtn, { backgroundColor: '#8e44ad' }, para < 200 && { opacity: 0.4 }]}
                            onPress={() => { setPara(prev => prev - 200); oyunuBaslat(oyunModu, c); }}>
                            <Text style={styles.catBtnText}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: 50 }} />
                </ScrollView>
            </View>
        );
    }

    const soru = sorular[mevcutIndex];
    if (safha === 'OYUN' && !soru) return null;

    return (
        <SafeAreaView style={styles.container}>
            <BakiyeGostergesi />
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.exitBtn} onPress={() => setCikisModal(true)}><Text style={styles.exitText}>X</Text></TouchableOpacity>
                    <View style={styles.timerBadge}><Text style={styles.timerText}>⏱ {sure}</Text></View>
                </View>
                <Text style={styles.skorLive}>{oyunModu === 'PRATIK' ? `Skor: ${dogruSayisi}` : `${mevcutIndex + 1}/${sorular.length}`}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.qText}>{soru?.soru}</Text>
                {aiIpucu && (
                    <View style={styles.aiHintContainer}>
                        <Text style={styles.aiHintText}>{aiIpucu}</Text>
                    </View>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {soru?.siklar.map((s, i) => {
                    const dogruCevap = soru.cevap;
                    let sikStili = [styles.opt];

                    if (secilenSik !== null) {
                        if (s === dogruCevap) {
                            sikStili.push(styles.ok);
                        } else if (s === secilenSik && s !== dogruCevap) {
                            sikStili.push(styles.no);
                        }
                    }

                    return (
                        <TouchableOpacity key={i} disabled={devreDisiSiklar.includes(s) || secilenSik !== null}
                            style={[sikStili, devreDisiSiklar.includes(s) && { opacity: 0.1 }]}
                            onPress={() => cevapVer(s)}>
                            <Text style={styles.optText}>{devreDisiSiklar.includes(s) ? "" : s}</Text>
                        </TouchableOpacity>
                    );
                })}

                <View style={styles.actionArea}>
                    <TouchableOpacity style={[styles.miniActionBtn, { backgroundColor: '#8e44ad' }]} onPress={useAIHint} disabled={secilenSik !== null || aiIpucu !== null}>
                        <Text style={styles.actionBtnText}>🤖 AI İPUCU (100 TL)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.miniActionBtn, { backgroundColor: '#f39c12' }]} onPress={useJoker} disabled={secilenSik !== null || devreDisiSiklar.length > 0}>
                        <Text style={styles.actionBtnText}>%50 JOKER (100 TL)</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 30 }} />
            </ScrollView>

            <Modal visible={cikisModal} transparent animationType="fade">
                <View style={styles.modalOverlay}><View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>ÇIKIŞ YAPILSIN MI?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={[styles.miniBtn, { backgroundColor: '#555' }]} onPress={() => setCikisModal(false)}><Text style={styles.miniBtnText}>HAYIR</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.miniBtn, { backgroundColor: '#e74c3c' }]} onPress={anaEkranaDon}><Text style={styles.miniBtnText}>EVET</Text></TouchableOpacity>
                    </View>
                </View></View>
            </Modal>
            <Modal visible={kayipModal} transparent animationType="slide">
                <View style={styles.modalOverlay}><View style={styles.modalBox}>
                    <Text style={[styles.modalTitle, { color: '#e74c3c' }]}>ELENDİNİZ!</Text>
                    <TouchableOpacity style={styles.mainBtn} onPress={anaEkranaDon}><Text style={styles.btnText}>ANA EKRAN</Text></TouchableOpacity>
                </View></View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centerView: { flex: 1, backgroundColor: '#0f0c29', justifyContent: 'center', alignItems: 'center', padding: 20 },
    fixedPara: { position: 'absolute', top: 15, right: 20, backgroundColor: 'rgba(46, 204, 113, 0.3)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#2ecc71', zIndex: 999 },
    fixedParaText: { color: '#f1c40f', fontSize: 16, fontWeight: 'bold' },
    logo: { fontSize: 36, color: '#00d2ff', fontWeight: '900', marginBottom: 30 },
    mainBtn: { backgroundColor: '#00d2ff', width: '85%', padding: 15, borderRadius: 15, alignItems: 'center' },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    title: { color: '#fff', fontSize: 22, marginBottom: 15, fontWeight: 'bold' },
    modBtn: { backgroundColor: '#1b1b3a', width: '100%', padding: 12, marginVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#00d2ff' },
    modBtnText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
    catBtn: { backgroundColor: '#2980b9', width: '100%', padding: 12, marginVertical: 4, borderRadius: 10 },
    catBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    catExitBtn: { position: 'absolute', top: 15, left: 20, width: 40, height: 40, backgroundColor: '#333', borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 999 },
    container: { flex: 1, backgroundColor: '#0f0c29', paddingHorizontal: 15 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 55, marginBottom: 5, height: 50 },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    exitBtn: { width: 35, height: 35, backgroundColor: '#333', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
    exitText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    timerBadge: { backgroundColor: '#e74c3c', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    timerText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    skorLive: { color: '#2ecc71', fontSize: 16, fontWeight: 'bold' },
    card: { backgroundColor: '#1b1b3a', padding: 18, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
    qText: { color: '#fff', fontSize: 17, textAlign: 'center', fontWeight: 'bold' },
    aiHintContainer: { marginTop: 12, padding: 10, backgroundColor: 'rgba(142, 68, 173, 0.2)', borderRadius: 10, borderWidth: 1, borderColor: '#8e44ad' },
    aiHintText: { color: '#fff', fontSize: 13, textAlign: 'center', fontStyle: 'italic', lineHeight: 18, fontWeight: '500' },
    opt: { backgroundColor: '#24243e', padding: 10, borderRadius: 10, marginVertical: 3, minHeight: 45, justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
    optText: { color: '#fff', fontSize: 14, textAlign: 'center' },
    ok: { backgroundColor: '#2ecc71', borderColor: '#fff' },
    no: { backgroundColor: '#e74c3c', borderColor: '#fff' },
    actionArea: { marginTop: 10 },
    miniActionBtn: { padding: 12, borderRadius: 10, marginVertical: 3, borderWidth: 1, borderColor: '#fff' },
    actionBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 14 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
    modalBox: { backgroundColor: '#1b1b3a', padding: 25, borderRadius: 20, width: '80%', alignItems: 'center', borderWidth: 2, borderColor: '#00d2ff' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#00d2ff', marginBottom: 20, textAlign: 'center' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
    miniBtn: { paddingVertical: 10, paddingHorizontal: 25, borderRadius: 8 },
    miniBtnText: { color: '#fff', fontWeight: 'bold' }
});