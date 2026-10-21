-- Keeps long inline paths, like `notebooks/data/wine_quality.arff`, and URLs
-- written out in full together on one line in the PDF, starting on a new line
-- if they don't fit.
local function together(el)
  return {
    pandoc.RawInline('latex', '\\linebreak\\mbox{'),
    el,
    pandoc.RawInline('latex', '}'),
  }
end

function Code(el)
  if FORMAT:match('latex') and #el.text > 25 and el.text:find('/') and not el.text:find('%s') then
    return together(el)
  end
end

function Link(el)
  local text = pandoc.utils.stringify(el.content)
  if FORMAT:match('latex') and text:match('^https?://') and #text > 25 then
    return together(el)
  end
end
