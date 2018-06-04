import {handleFormSubmitHoc, handleInputChangeHoc} from "../../helpers/utils";

export class CommonComponent {
  public handleFormSubmit;
  public handleInputChange;

  componentWillLoad() {
    this.handleInputChange = handleInputChangeHoc().bind(this);
    this.handleFormSubmit = handleFormSubmitHoc().bind(this);
  }
}
