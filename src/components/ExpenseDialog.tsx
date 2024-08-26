import Expense from "@/models/Expense"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"

interface ExpenseDialogProps{
    expense: Expense|null,
    onClose: () => void
}

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({expense, onClose}) => {
    return (
    <Dialog open={expense !== null} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Expense Detail</DialogTitle>
            </DialogHeader>
            <Label>Description:</Label> {expense?.description}
        </DialogContent>
    </Dialog>)
}

export default ExpenseDialog;