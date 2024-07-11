require 'erb'

class ShowExceptions
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    app.call(env)
  rescue Exception => e
    render_exception(e)
  end

  private

  def render_exception(e)
    dir_path = File.dirname(__FILE__)
    template_fname = File.join(dir_path, "templates", "rescue.html.erb")
    template = File.read(template_fname)
    body = ERB.new(template).result(binding)

    ['500', {'Content-type' => 'text/html'}, body]
  end

  def error_source_file(e)
    stack_trace_top = e.backtrace.first.split(':')
    stack_trace_top(e)[0]
  end

  def stack_trace_top(e)
    e.backtrace[0].split(':')
  end

  def extract_formatted_source(e)
    source_file_name = error_source_file(e)
    source_line_num = source_line_num(e)
    source_lines = extract_source(source_file_name)
    format_source(source_lines, source_line_num)
  end

  def source_line_num(e)
    stack_trace_top(e)[1].to_i
  end

  def formatted_source(file, source_line_num)
    source_lines = extract_source(file)
    format_source(source_lines, source_line_num)
  end

  def extract_source(file)
    source_file = File.open(file, 'r')
    source_file.readlines
  end

  def format_source(source_lines, source_line_num)
    start = [0, source_line_num - 3].max
    lines = source_lines[start..(start + 5)]
    Hash[*(start+1..(lines.count + start)).zip(lines).flatten]
  end
end
