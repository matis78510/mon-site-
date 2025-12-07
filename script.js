 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index 0b965addd6ca6ec1f11f78073153ef156bf3da1c..ed35a7bbee22dccfb206575365dbfc2cba1bacac 100644
--- a/script.js
+++ b/script.js
@@ -1,52 +1,97 @@
 /* script.js
    - Gère : onglets (nav), scroll lisse, activation du lien nav au scroll
 */
 
-/* Smooth scroll et activation nav au clic */
-document.querySelectorAll('.main-nav .nav-link').forEach(link => {
-  link.addEventListener('click', function(e) {
-    e.preventDefault();
-    // retirer active
-    document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
-    this.classList.add('active');
-
-    // scroll smooth vers la section
-    const target = document.querySelector(this.getAttribute('href'));
+const navLinks = document.querySelectorAll('.main-nav .nav-link');
+
+/* Smooth scroll avec respect du paramètre réduit-motion */
+navLinks.forEach(link => {
+  link.addEventListener('click', event => {
+    event.preventDefault();
+
+    const targetSelector = link.getAttribute('href');
+    if (!targetSelector || !targetSelector.startsWith('#')) return;
+
+    const target = document.querySelector(targetSelector);
     if (target) {
-      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
-      // pour mobile, fermer menus si besoin (non présent ici)
+      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
     }
   });
 });
 
-/* Mettre à jour le lien actif selon le scroll */
-const sections = document.querySelectorAll('main .panel, main section[id]');
-const navLinks = document.querySelectorAll('.main-nav .nav-link');
+/* Mettre à jour le lien actif selon le scroll avec IntersectionObserver */
+const sections = document.querySelectorAll('main .panel[id], main section[id]');
+const activeClass = 'active';
 
-function onScroll() {
-  const scrollPos = window.scrollY || window.pageYOffset;
-  let found = false;
-
-  sections.forEach(sec => {
-    const rect = sec.getBoundingClientRect();
-    const top = rect.top + window.scrollY;
-    const height = rect.height;
-    // zone centrale pour déclencher
-    if (scrollPos >= top - window.innerHeight / 3 && scrollPos < top + height - window.innerHeight / 3) {
-      const id = sec.id;
-      if (!id) return;
-      document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
-      const activeLink = document.querySelector('.main-nav .nav-link[href="#' + id + '"]');
-      if (activeLink) activeLink.classList.add('active');
-      found = true;
-    }
+function setActiveLink(id) {
+  navLinks.forEach(link => {
+    const isActive = link.getAttribute('href') === `#${id}`;
+    link.classList.toggle(activeClass, isActive);
   });
-  // si aucune section trouvée, marque le premier
-  if (!found) {
-    document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
-    if (navLinks[0]) navLinks[0].classList.add('active');
-  }
 }
 
-window.addEventListener('scroll', onScroll, { passive: true });
-window.addEventListener('load', onScroll);
+if ('IntersectionObserver' in window) {
+  const observer = new IntersectionObserver(entries => {
+    entries.forEach(entry => {
+      if (entry.isIntersecting) {
+        setActiveLink(entry.target.id);
+      }
+    });
+  }, {
+    rootMargin: '-40% 0px -40% 0px',
+    threshold: 0.2
+  });
+
+  sections.forEach(section => observer.observe(section));
+} else {
+  const onScrollFallback = () => {
+    const scrollPos = window.scrollY || window.pageYOffset;
+    let found = false;
+
+    sections.forEach(sec => {
+      const rect = sec.getBoundingClientRect();
+      const top = rect.top + window.scrollY;
+      const height = rect.height;
+      if (scrollPos >= top - window.innerHeight / 3 && scrollPos < top + height - window.innerHeight / 3) {
+        setActiveLink(sec.id);
+        found = true;
+      }
+    });
+
+    if (!found && sections[0]) {
+      setActiveLink(sections[0].id);
+    }
+  };
+
+  window.addEventListener('scroll', onScrollFallback, { passive: true });
+  window.addEventListener('load', onScrollFallback);
+}
+
+/* Message de feedback pour le formulaire de contact */
+const form = document.getElementById('contact-form');
+const feedback = document.getElementById('form-feedback');
+
+if (form && feedback) {
+  form.addEventListener('submit', event => {
+    event.preventDefault();
+
+    const name = form.name.value.trim();
+    const email = form.email.value.trim();
+    const message = form.message.value.trim();
+
+    if (!name || !email || !message) {
+      feedback.textContent = 'Merci de remplir tous les champs avant d\'envoyer votre message.';
+      feedback.style.color = '#fca5a5';
+      return;
+    }
+
+    const subject = encodeURIComponent(`Message depuis le portfolio - ${name}`);
+    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
+    const mailtoLink = `mailto:matis.rodrigues@ileps.fr?subject=${subject}&body=${body}`;
+
+    window.location.href = mailtoLink;
+    feedback.textContent = 'Votre client mail va s\'ouvrir avec le message pré-rempli.';
+    feedback.style.color = '#bbf7d0';
+  });
+}
 
EOF
)
