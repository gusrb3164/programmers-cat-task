import Nodes from '../components/nodes.js';
import BreadCrumb from '../components/breadcrumb.js';
import ImageViewer from '../components/imageviewer.js';
import Loading from '../components/loading.js';
import useCache from '../utils/cache.js';
import { getImages } from '../utils/api.js';

export default function main($app) {
  this.state = {
    nodes: [],
    breadCrumb: [{ name: 'root', id: null }],
    isModalOn: false,
    imageUrl: '',
    isLoading: false,
  };
  const [getCache, setCache] = useCache();

  const breadCrumb = new BreadCrumb({
    $app,
    initialState: this.state.breadCrumb,
    onClick: async name => {
      const idx = this.state.breadCrumb.findIndex(item => item.name === name);
      const id = this.state.breadCrumb[idx].id;
      let nodesData = getCache(id ? id : 'root');

      if (!nodesData) {
        nodesData = await getImages(id);
        setCache(id, nodesData);
      }
      this.setState({
        ...this.state,
        nodes: nodesData,
        breadCrumb: this.state.breadCrumb.slice(0, idx + 1),
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes, isRoot: this.state.breadCrumb.length === 1 },
    onClick: async (nodeId, nodeType, name, path) => {
      loading.setState({ isLoading: true });
      if (nodeType === 'DIRECTORY') {
        let nodesData = getCache(nodeId);

        if (!nodesData) {
          nodesData = await getImages(nodeId);
          setCache(nodeId, nodesData);
        }

        this.setState({
          ...this.state,
          nodes: nodesData,
          breadCrumb: [...this.state.breadCrumb, { name, id: nodeId }],
          isLoading: false,
        });
        return;
      }

      this.setState({
        ...this.state,
        isModalOn: true,
        imageUrl: path,
        isLoading: false,
      });
    },
    onBackClick: async () => {
      const prevCrumb = this.state.breadCrumb.slice(0, -1);
      const parentId = this.state.breadCrumb[prevCrumb.length - 1]?.id;
      let nodesData = getCache(parentId ? parentId : 'root');

      if (!nodesData) {
        nodesData = await getImages(parentId);
        setCache(parentId, nodesData);
      }

      this.setState({ ...this.state, nodes: nodesData, breadCrumb: prevCrumb });
    },
  });

  const imageViewer = new ImageViewer({
    $app,
    initialState: { imageUrl: this.state.imageUrl, isModalOn: this.state.isModalOn },
    onClose: () => {
      this.setState({ ...this.state, isModalOn: false });
    },
  });

  const loading = new Loading({
    $app,
    initialState: { isLoading: false },
  });

  this.setState = state => {
    this.state = state;
    breadCrumb.setState(this.state.breadCrumb);
    nodes.setState({ nodes: this.state.nodes, isRoot: this.state.breadCrumb.length === 1 });
    imageViewer.setState({ imageUrl: this.state.imageUrl, isModalOn: this.state.isModalOn });
    loading.setState({ isLoading: this.state.isLoading });
  };

  const init = async () => {
    loading.setState({ isLoading: true });
    const nodesData = await getImages();
    setCache('root', nodesData);
    this.setState({ ...this.state, nodes: nodesData, isLoading: false });
  };

  init();
}
