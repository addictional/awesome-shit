import React,{ImgHTMLAttributes} from "react";
import './style.sass';


interface IProps  extends ImgHTMLAttributes<any>{
    loadedClassName : string;
    loadingClassName : string;
}

interface IState {
    loaded : boolean;
}

class ImageLoader extends React.Component<IProps,IState> {
  


  //initial state: image loaded stage 
  state = {
    loaded: false
  };

  //define our loading and loaded image classes
  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded"
  };

  //image onLoad handler to update state to loaded
  onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };


  render() {
  
    let { className, loadedClassName, loadingClassName } = this.props;

    className = `img-loader ${className} ${this.state.loaded
      ? loadedClassName
      : loadingClassName}`;
      console.log(className);

    return <img 
             {...this.props}
             className={className} 
             onLoad={this.onLoad}
             alt={this.props.alt}  
            />;
  }
}

export default ImageLoader;