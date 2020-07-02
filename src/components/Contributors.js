export default function Contributor(contributor) {
  const contributorContainer = document.createElement('a');
  contributorContainer.target = 'blank';
  contributorContainer.id = 'contributor_container';
  contributorContainer.href = contributor.url;
  contributorContainer.className = 'd-flex flex-column justify-content-center align-items-center m-3';

  const contributorImage = document.createElement('img');
  contributorImage.src = contributor.avatar_url;
  contributorImage.alt = contributor.login;
  // contributorImage.classList.add('rounded-circle');

  const contributorText = document.createElement('span');
  contributorText.innerHTML = contributor.login;

  contributorContainer.appendChild(contributorImage);
  contributorContainer.appendChild(contributorText);

  return contributorContainer;
}
