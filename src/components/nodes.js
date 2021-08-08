export default function nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  const $target = document.createElement('div');
  $target.className = 'Nodes';
  $target.addEventListener('click', e => {
    const $node = e.target.closest('.Node');

    if ($node) {
      const { id, type, name, path } = $node.dataset;
      if (!id) {
        onBackClick();
        return;
      }
      onClick(id, type, name, path);
    }
  });
  $app.appendChild($target);

  this.setState = state => {
    this.state = state;
    this.render();
  };

  this.render = () => {
    const template = this.state.nodes
      .map(node =>
        node.type === 'FILE'
          ? `
            <div class="Node" data-id="${node.id}" data-name="${node.name}" data-type="FILE" data-path="${node.filePath}">
                <img src="./assets/file.png">
                <div>"${node.name}"</div>
            </div>
        `
          : `
            <div class="Node" data-id="${node.id}" data-name="${node.name}" data-type="DIRECTORY">
                <img src="./assets/directory.png">
                <div>"${node.name}"</div>
            </div>
        `,
      )
      .join('');

    $target.innerHTML = this.state.isRoot
      ? template
      : `
        <div class="Node">
          <img src="./assets/prev.png">
        </div>${template}`;
  };

  this.render();
}
