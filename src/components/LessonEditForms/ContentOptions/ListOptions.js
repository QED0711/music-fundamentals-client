import React, {Component} from 'react';



// ListItemInput Component

const ListItemInput = ({newItem, data}) => {
    // debugger
    return(
        <div>
            <textarea className={typeof data === "string" ? "edit-content-data" : "new-content-data"} defaultValue={data && (data || "")}/*  onChange={newItem} */></textarea>
            <br/>
        </div>
    )

}



class ListOptions extends Component {
    constructor(props){
        super(props);

        this.listItemCount = this.listItemCount.bind(this);
        
        let listItems = []
        if(this.props.content){
            let data
            for(let i = 0; i < this.props.content.data.length; i++){
                data = this.props.content.data[i]
                listItems.push(<ListItemInput key={i} newItem={this.listItemCount} data={data}/>)
            }
            // listItems.push(<ListItemInput key={listItems.length} newItem={this.listItemCount} data={""}/>)
        } else {
            listItems = [<ListItemInput key={0} newItem={this.listItemCount} />]
        } 

        this.state = {
            listItems
        }

    }

    listItemCount(){
        let className = this.props.content ? "edit-content-data" : "new-content-data";
        let items = [...document.getElementsByClassName(className)];

        if(items[items.length - 1].value !== ""){
            let listItems = [...this.state.listItems]
            listItems.push(<ListItemInput key={this.state.listItems.length + 1} newItem={this.listItemCount} data={items[items.length - 1].value}/>)
            this.setState({
                listItems
            })

        }
    }


    render(){
        return(
            <div id="content-options">
                <label>text</label><br/>
                {this.state.listItems}
                <br/>
                {
                    !this.props.content && 
                    <div className="content-position">
                        <label>Position (optional)</label>
                        <br/>
                        <input id={this.props.content ? "edit-content-position" : "new-content-position"} type="number"/>
                    </div>
                }
                {/* <label>Position (optional)</label><br/>
                <input id={this.props.content ? "edit-content-position" : "new-content-position"} type="number"/> */}
            </div>
        )
    }

}

export default ListOptions;