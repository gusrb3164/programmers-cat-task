export default function BreadCrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  const $target = document.createElement('nav');
  $target.className = 'Breadcrumb';
  $app.appendChild($target);

  $target.addEventListener('click', e => {
    const { name } = e.target.closest('div').dataset;
    if (!name) return;

    onClick(name);
  });

  this.setState = state => {
    this.state = state;
    this.render();
  };
  this.render = () => {
    const template = this.state
      .map(
        item => `
            <div data-name="${item.name}">${item.name}</div>
        `,
      )
      .join('');

    $target.innerHTML = template;
  };
  this.render();
}
