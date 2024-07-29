module ApplicationHelper
  def ugly_lyrics(lyrics)
    formatted_lyrics = ""
    lyrics.lines.each do |line|
      formatted_lyrics << "&#9835; #{h(line)}"
    end

    "<pre class='lyrics'>#{formatted_lyrics}</pre>".html_safe
  end
end