import { ElementRef } from '@angular/core';

declare var M

export interface MaterialInstance {
    open?() :void
    close?() :void
    destroy?() :void
}

export interface MaterialDP extends MaterialInstance {
    date?: Date
}
export class MaterialService {
    static toast(message:string) {
        M.toast({html:message})
    }
    static initializeFloatingButton(ref:ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement)
    }
    static updateTextInputs() {
        M.updateTextFields()
    }
    static initModal(ref:ElementRef) : MaterialInstance{
       return M.Modal.init(ref.nativeElement)
    }
    static initTT(ref: ElementRef) {
        return M.Tooltip.init(ref.nativeElement)
    }
    static initDP(ref:ElementRef,onClose: ()=>void): MaterialDP {
        return M.Datepicker.init(ref.nativeElement, {
            format: 'dd.mm.yyyy',
            showClearBtn: true,
            onClose
        })
    }
    static initTTarget(ref: ElementRef):MaterialInstance {
        return M.TapTarget.init(ref.nativeElement)
    }
}