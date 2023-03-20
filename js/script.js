document.getElementById('bio_link').addEventListener('click', function(e) {
  e.preventDefault();
  const bioElement = document.getElementById('bio');
  const offset = bioElement.offsetHeight * 0.2;
  window.scrollTo({ top: bioElement.offsetTop - offset, behavior: 'smooth' });
});

document.getElementById('projects_link').addEventListener('click', function(e) {
  e.preventDefault();
  const element = document.getElementById('umweltprotocols');
  const offset = element.offsetHeight * 0.2;
  window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
});

