const BASE_URL =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImageViewer({ $app, initialState, onClose }) {
  this.state = initialState;
  const $target = document.createElement('div');
  $target.className = 'Modal ImageViewer';

  $target.addEventListener('click', e => {
    if (e.target !== $target) {
      return;
    }
    onClose();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      onClose();
    }
  });

  $app.appendChild($target);

  this.setState = state => {
    this.state = state;
    this.render();
  };

  this.render = () => {
    if (this.state?.isModalOn) {
      $target.style.display = 'block';
      $target.innerHTML = `
            <div class="content">
                <img width="400px" src="${BASE_URL}${this.state?.imageUrl}">
            </div>`;
      return;
    }

    $target.style.display = 'none';
  };

  this.render();
}
