export default function Loading({ $app, initialState }) {
  this.state = initialState;
  const $target = document.createElement('div');
  $target.className = 'Modal Loading';
  $app.appendChild($target);

  this.setState = state => {
    this.state = state;
    this.render();
  };

  this.render = () => {
    $target.style.display = this.state.isLoading ? 'block' : 'none';
    $target.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
        `;
  };

  this.render();
}
