# 🎬 Film App
[TMDB](https://www.themoviedb.org/) api kullanarak hazırlamış olduğum film öneri uygulaması.
<br/>
<br/>
[Youtube tanıtım vieo](https://www.youtube.com/watch?v=UHRMkFRIgOc&t=41s)
<br/>
[![filmapp](https://img.youtube.com/vi/UHRMkFRIgOc/0.jpg)](https://www.youtube.com/watch?v=UHRMkFRIgOc&t=00m41s)

## Kullanılan Teknolojiler
1. Frontend
   - React Native
   - Expo
2. Backend
   - Nodejs
   - Express
   - Mysql

## Projenin Amacı ve Hedef Kitlesi
1. Amaçlar
   - Kullanıcıların film keşfetme deneyimini iyileştirmek.
   - Film seçiminde kararsızlık yaşayanlara çözüm sunmak.
   - Sevilen içerikleri kategorize edip kolay ulaşımı sağlamak.
2. Hedef Kitle
   - Geniş bir film izleyici kitlesi.
   - Her yaştan ve zevkten kullanıcılar.

## Kişiselleştirilmiş Öneriler
1. Kullanıcı Davranışları
   - Algoritmalar, kullanıcı davranışlarına göre öğrenir. [işbirlikçi filtreleme](https://tr.wikipedia.org/wiki/%C4%B0%C5%9Fbirlik%C3%A7i_filtreleme)
2. Öneri Çeşitliliği
   - Tür, yönetmen, oyuncu gibi faktörlere göre filtreleme yapılır. [içerik bazlı filtreleme](https://www.ibm.com/think/topics/content-based-filtering)
   <br>
Projede, yukarıdaki iki yaklaşım birleştirilerek [hibrit model](https://burakbagatarhan.medium.com/recommender-system-genel-bak%C4%B1%C5%9F-part-2-collaborative-filtering-hybrid-models-26cda69fb439) kullanılmıştır.

## Güvenlik
### [JWT](https://jwt.io/introduction) (Json Web Token)
Her doğrulama gerektiren Ana sayfa, Profil sayfası, vb. sayfalara erişimde jwt istenir, jwt geçersiz ise erişim engellenir.
1. Server Katmanı
   * Jwt 512 karakter uzunluğundaki anahtar ile imzalanır.
2. Client Katmanı
   * İmzalanmış jwt [expo secure store](https://docs.expo.dev/versions/latest/sdk/securestore/) ile güvenli alanda saklanır.

## Diyagramlar
1. Kullanıcı Doğrulama Diyagramı
  ![dogrulama](https://github.com/user-attachments/assets/5ea4775c-9910-410b-ba6f-f22ee2441853)

2. Film Öneri Diyagramı
  ![oneridiyagram drawio](https://github.com/user-attachments/assets/68cdc88f-bcce-45e9-aebc-962e2169c90c)
