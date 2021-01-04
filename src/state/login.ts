import { AccountManager, ButtonManager } from "../manager";
import { PlaylistProvider } from "../provider";
import { commands } from "vscode";

export class LoggedIn {
  private static state = false;

  static get() {
    return this.state;
  }

  static set(newValue: boolean) {
    if (newValue !== this.state) {
      this.state = newValue;
      if (newValue) {
        ButtonManager.buttonAccountAccount(AccountManager.nickname);
        ButtonManager.show();
        PlaylistProvider.refresh({ refresh: true });
      } else {
        ButtonManager.buttonAccountSignin();
        ButtonManager.hide();
      }
      void commands.executeCommand("cloudmusic.clearQueue");
    }
  }
}
