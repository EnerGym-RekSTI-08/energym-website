type ErrorStateProps = {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <div className="rounded-[22px] border border-red-500/40 bg-red-950/20 p-6 text-sm text-red-200">
    {message}
  </div>
)
